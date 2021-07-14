<?php

namespace app\modules\v1\controllers;

use app\models\StarRating;
use app\models\Status;
use common\models\PersonSearch;
use Yii;
use yii\rest\Controller;

class RateController extends Controller
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


    public function actionIndex()
    {
        $model = new StarRating();
        $post = Yii::$app->request->post();

        $model->user_id = $post['user_id'];
        $model->video_id = $post['video_id'];
        $model->rating = $post['rating'];

        if ($model->save()) {
            Yii::$app->response->statusCode = Status::STATUS_OK;
            return [
                'status' => Status::STATUS_OK,
                'message' => 'Rate succeed',
                'data' => []
            ];
        }

        Yii::$app->response->statusCode = Status::STATUS_BAD_REQUEST;
        return [
            'status' => Status::STATUS_BAD_REQUEST,
            'message' => 'Error',
            'data' => ''
        ];
    }
}
