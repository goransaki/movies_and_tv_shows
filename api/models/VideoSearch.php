<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use yii\data\ArrayDataProvider;
use yii\db\Query;


class VideoSearch extends Video
{
    public $user_id;
    public $search;
    const AFTER_REGEX = '/\s*after\s*\d{4}$/';
    const OLDER_THAN = '/^older then \d* years$/';
    const YEAR_NUMBER_REGEX = '/^older then (\d*) years$/';
    const YEAR_REGEX = '/\s*after\s*(\d{4})$/';
    const GET_NUMBER_REGEX = '/(\d*)/';
    const NUMBER_OF_STAR_REGEX = '/^[0-5] stars$/';
    const AT_LEAST_STAR_REGEX = '/^at least [0-5] stars$/';

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'title', 'description', 'release_date', 'user_id', 'type', 'search'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function scenarios()
    {
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $this->load($params, '');

        $actorVideo = (new Query())->select(['*'])
            ->from('actor_video')
            ->leftJoin(['actor'], 'actor.id = actor_video.actor_id ')->all();

        $starRatingQuery = (new Query())->select(['video_id', 'ROUND(AVG(`rating`), 1) as avg_rating'])
            ->from('star_rating')
            ->groupBy(['video_id']);


        $videoListQuery = (new Query())->select(['id', 'sr.avg_rating', 'title', 'description', 'release_date', 'type', 'TO_BASE64(image) as image'])
            ->from(['video'])
            ->leftJoin(['sr' => $starRatingQuery], 'sr.video_id = video.id ');

        if (!empty($this->type)) {
            $videoListQuery->andFilterWhere(['type' => $this->type]);
        }

        if ($this->search != "null") {
            if (preg_match(self::NUMBER_OF_STAR_REGEX, $this->search)) {
                $matches = [];
                preg_match(self::GET_NUMBER_REGEX, $this->search, $matches);
                $videoListQuery->andWhere(['sr.avg_rating' => (int)$matches[1]]);

            } else if (preg_match(self::AT_LEAST_STAR_REGEX, $this->search)) {
                $matches = [];
                preg_match(self::GET_NUMBER_REGEX, $this->search, $matches);
                $videoListQuery->andWhere(['>=', 'sr.avg_rating', (int)$matches[1]]);

            } else if (preg_match(self::AFTER_REGEX, $this->search)) {

                $matches = [];
                preg_match(self::YEAR_REGEX, $this->search, $matches);
                $videoListQuery->andWhere(['>=', 'release_date', $matches[1] . '-01-01']);

            } else if (preg_match(self::OLDER_THAN, $this->search)) {
                $matches = [];
                preg_match(self::YEAR_NUMBER_REGEX, $this->search, $matches);
                $time = strtotime("-" . $matches[1] . " year", time());
                $date = date("Y-m-d", $time);
                $videoListQuery->andWhere(['<', 'release_date', $date]);
            } else {
                $videoListQuery->andWhere(['and',
                    ['or',
                        ['like', 'title', $this->search],
                        ['like', 'description', $this->search],
                        ['like', 'release_date', $this->search]
                    ]
                ]);
            }
        }

        $videoList = $videoListQuery->orderBy(['sr.avg_rating' => SORT_DESC])->indexBy('id')->all();
        $videoList = $this->prepareVideoListWithActors($videoList, $actorVideo);

        $dataProvider = new ArrayDataProvider([
            'allModels' => $videoList,
            'pagination' => [
                'pageSize' => 10,
            ],
        ]);


        if (!$this->validate()) {
            return $dataProvider;
        }
        //Use some condition if we need this.
        return $dataProvider;
    }

    /**
     * @param array $videoList
     * @param array $actorVideo
     * @return array
     */
    public function prepareVideoListWithActors(array $videoList, array $actorVideo): array
    {
        foreach ($videoList as $video) {
            foreach ($actorVideo as $value) {

                if (!array_key_exists($value['video_id'], $videoList) || !array_key_exists('actors', $videoList[$value['video_id']]) || in_array($value['name'], $videoList[$value['video_id']]['actors'])) {
                    continue;
                }
                $videoList[$value['video_id']]['actors'][] = $value['name'];
            }
        }
        return $videoList;
    }


}
