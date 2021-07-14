<?php

namespace app\components;

use app\models\User;
use Yii;
use yii\web\Response;
use yii\web\UnauthorizedHttpException;
use yii\filters\auth\AuthMethod;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use common\helpers\HttpHelper;
use common\components\authmanager\AuthTokenProvider;

class TokenAuth extends AuthMethod
{
    /** @var \GuzzleHttp\Psr7\Response $_tokenAuthResponse */
    protected $_tokenAuthResponse;

    public function beforeAction($action)
    {
        /** @var $action \yii\base\Action */
        if (!$this->isActive($action)) {
            return true;
        }

        return parent::beforeAction($action);
    }

    public function authenticate($user, $request, $response)
    {

        $token = $this->getAuthToken($request);
        if (empty($token)) {
            return null;
        }

        try {

            /** @var User $identity */
            $identity = User::findIdentityByAccessToken($token);

            if ($identity && $user->login($identity)) {
                $identity->accessToken = $token;
                $identity->updateLastLoginTime();

                return $identity;
            }

            throw new UnauthorizedHttpException('You are requesting with an invalid credential. User do not exists.');
        } catch (ClientException $e) {
            $this->_tokenAuthResponse = $e->getResponse();
        }

        return null;
    }

    private function getAuthToken($request)
    {
        return (new AuthTokenProvider($request))->getAuthToken();
    }

    public function handleFailure($response)
    {
        $response->format = Response::FORMAT_JSON;

        if (empty($this->_tokenAuthResponse)) {
            throw new UnauthorizedHttpException('You are requesting with an invalid credential.');
        }

        $response->setStatusCode($this->_tokenAuthResponse->getStatusCode());
        $response->content = $this->_tokenAuthResponse->getBody()->getContents();
    }
}
