<?php

namespace app\modules\v1\controllers;

use app\models\VideoSearch;
use common\models\PersonSearch;
use Yii;
use yii\rest\Controller;

class VideoController extends Controller
{
    public function actionIndex()
    {
        $searchModel = new VideoSearch();
        return $searchModel->search(Yii::$app->request->queryParams);
    }
}
