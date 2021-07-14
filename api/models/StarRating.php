<?php


namespace app\models;


use yii\db\ActiveRecord;

/**
 * This is the model class for table "star_rating".
 *
 * @property integer $user_id
 * @property integer $video_id
 * @property integer $rating
 */
class StarRating extends ActiveRecord
{
    public static function tableName()
    {
        return 'star_rating';
    }

    public function rules()
    {
        return [
            [['user_id', 'video_id', 'rating'], 'required'],
        ];
    }
}
