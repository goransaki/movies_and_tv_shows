<?php


namespace app\models;


use yii\db\ActiveRecord;

class Video extends ActiveRecord
{
    public static function tableName()
    {
        return 'video';
    }

    public function rules()
    {
        return [
            ['title', 'description', 'release_date', 'type', 'image', 'required'],
        ];
    }
}
