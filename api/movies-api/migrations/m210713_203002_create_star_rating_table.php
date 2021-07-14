<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%star_rating}}`.
 */
class m210713_203002_create_star_rating_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%star_rating}}', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer(),
            'video_id' => $this->integer(),
            'rating' => $this->smallInteger(),
        ]);

        $this->addForeignKey('star_rating_user_id', 'star_rating', 'user_id', 'user', 'id');
        $this->addForeignKey('star_rating_video_id', 'star_rating', 'video_id', 'video', 'id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('star_rating_user_id', 'star_rating');
        $this->dropForeignKey('star_rating_video_id', 'star_rating');

        $this->dropTable('{{%star_rating}}');
    }
}
