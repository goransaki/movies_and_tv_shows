<?php

namespace app\models\base;


use yii\base\Model;

abstract class ListSearch extends Model
{
    public $query;

    public function formName()
    {
        return '';
    }

    public function rules()
    {
        return [
            ['query', 'safe']
        ];
    }

    public abstract function search($params = []);
}
