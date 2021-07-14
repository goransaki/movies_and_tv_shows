<?php

namespace app\models\base;


use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use yii\db\ActiveQuery;
use yii\db\Query;

abstract class SearchModel extends Model
{
    public function formName()
    {
        return '';
    }

    public function getPageSize()
    {
        return 20;
    }

    public function getRequestedPage()
    {
        return (int)Yii::$app->request->get('page', 0);
    }

    public function shouldFilterBy($attribute)
    {
        return !empty($this->{$attribute});
    }

    public function applyFiltersToQuery($query): Query
    {
       $attributes = $this->attributeFilters();

       foreach ($attributes as $attribute => $filter) {
           if ($this->shouldFilterBy($attribute)) {
               $query = $filter($query, $attribute);
           }
       }

       return $query;
    }

    public function attributeFilters(): array
    {
        return [];
    }

    public abstract function search(): ActiveDataProvider;
}
