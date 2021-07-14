<?php

namespace app\models\base;


use Yii;
use yii\base\Model;
use yii\helpers\ArrayHelper;

abstract class StaticMapModel extends Model
{
    public static function getMap()
    {
        static $memoized = [];
        $languageDependency = static::isLanguageDependent() ? '_' . Yii::$app->language : '';
        $key = static::class . '_map' . $languageDependency;

        if (!array_key_exists($key, $memoized)) {
            return $memoized[$key] = Yii::$app->cache->getOrSet($key, fn() => static::retrieveMap(), static::getDuration());
        }

        return $memoized[$key];
    }

    protected static function getDuration()
    {
        return 300;
    }

    public static function getKeys()
    {
        return array_keys(static::getMap());
    }

    public static function mapSingle($key, $default = '')
    {
        $map = static::getMap();
        return ArrayHelper::getValue($map, $key, $default);
    }

    protected static abstract function isLanguageDependent(): bool;

    protected static abstract function retrieveMap(): array;
}
