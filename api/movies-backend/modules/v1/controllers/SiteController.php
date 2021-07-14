<?php

namespace app\modules\v1\controllers;

use app\extensions\CorsFilter;
use app\models\Post;
use app\models\Status;
use app\models\User;
use Yii;
use yii\helpers\ArrayHelper;
use yii\rest\Controller;

class SiteController extends Controller
{

    public function behaviors()
    {
        return [
            'corsFilter' => [
                'class' => \yii\filters\Cors::class,
                'cors' => [
                    'Origin' => ['http://localhost:4200'],
                    'Access-Control-Request-Method' => ['POST'],
                    'Access-Control-Request-Headers' => ['X-Wsse'],
                    'Access-Control-Allow-Credentials' => true,
                    'Access-Control-Max-Age' => 3600,
                    'Access-Control-Expose-Headers' => ['X-Pagination-Current-Page'],
                ],

            ],
        ];
    }

    protected function verbs()
    {
        return [
            'signup' => ['POST'],
            'login' => ['POST'],
        ];
    }

    public function actionSignup()
    {
        $model = new User();
        $params = Yii::$app->request->post();
        if (!$params) {
            Yii::$app->response->statusCode = Status::STATUS_BAD_REQUEST;
            return [
                'status' => Status::STATUS_BAD_REQUEST,
                'message' => "Need username, password, and email.",
                'data' => ''
            ];
        }


        $model->username = $params['username'];
        $model->email = $params['email'];

        $model->setPassword($params['password']);
        $model->generateAuthKey();
        $model->status = User::STATUS_ACTIVE;

        if ($model->save()) {
            Yii::$app->response->statusCode = Status::STATUS_CREATED;
            $response['isSuccess'] = 201;
            $response['message'] = 'You are now a member!';
            $response['user'] = \app\models\User::findByUsername($model->username);
            return [
                'status' => Status::STATUS_CREATED,
                'message' => 'You are now a member',
                'data' => User::findByUsername($model->username),
            ];
        }

        Yii::$app->response->statusCode = Status::STATUS_BAD_REQUEST;
        $model->getErrors();
        $response['hasErrors'] = $model->hasErrors();
        $response['errors'] = $model->getErrors();
        return [
            'status' => Status::STATUS_BAD_REQUEST,
            'message' => 'Error saving data!',
            'data' => [
                'hasErrors' => $model->hasErrors(),
                'getErrors' => $model->getErrors(),
            ]
        ];
    }

    public function actionLogin()
    {
        $params = Yii::$app->request->post();
        if (empty($params['username']) || empty($params['password'])) return [
            'status' => Status::STATUS_BAD_REQUEST,
            'message' => "Need username and password.",
            'data' => ''
        ];

        $user = User::findByUsername($params['username']);

        if ($user && $user->validatePassword($params['password'])) {
            if (isset($params['consumer'])) $user->consumer = $params['consumer'];
            if (isset($params['access_given'])) $user->access_given = $params['access_given'];

            Yii::$app->response->statusCode = Status::STATUS_OK;
            $user->generateAuthKey();
            $user->save();

            return [
                'status' => Status::STATUS_OK,
                'message' => 'Login Succeed',
                'data' => [
                    'id' => $user->id,
                    'token' => $user->auth_key,
                    'email' => $user['email'],
                ]
            ];
        }

        Yii::$app->response->statusCode = Status::STATUS_UNAUTHORIZED;
        return [
            'status' => Status::STATUS_UNAUTHORIZED,
            'message' => 'Username and Password not found. Check Again!',
            'data' => ''
        ];
    }
}
