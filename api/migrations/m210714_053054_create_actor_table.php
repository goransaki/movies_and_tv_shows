<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%actor}}`.
 */
class m210714_053054_create_actor_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%actor}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string()->notNull(),
        ]);

        $this->createTable('{{%actor_video}}', [
            'id' => $this->primaryKey(),
            'actor_id' => $this->integer(),
            'video_id' => $this->integer(),
        ]);

        $this->addForeignKey('actor_video_actor_id', 'actor_video', 'actor_id', 'actor', 'id');
        $this->addForeignKey('actor_video_video_id', 'actor_video', 'video_id', 'video', 'id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('actor_video_actor_id', 'actor_video');
        $this->dropForeignKey('actor_video_video_id', 'actor_video');

        $this->dropTable('{{%actor_video}}');
        $this->dropTable('{{%actor}}');
    }
}
