import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import { useTranslation } from 'react-i18next';

import { useStyles } from './constructor-preview.style';
import { CONSTRUCTOR_VIDEO_LINK } from '../constants';
import routes from '../../../configs/routes';

const { pathToConstructor } = routes;

const ConstructorPreview = () => {
  const { t } = useTranslation();

  const [isZeroVolume, setIsZeroVolume] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const styles = useStyles();

  return (
    <div className={styles.constructorPreview} id='constructor' data-section-style='dark'>
      <ReactPlayer
        width='100%'
        height='100%'
        playing
        volume={isZeroVolume}
        muted={isMuted}
        loop
        url={CONSTRUCTOR_VIDEO_LINK}
      />
      <div className={styles.constructorContent}>
        <div>
          <h2 className={styles.constructorTitle}> {t('home.createUniqueStyle')} </h2>
          <p className={styles.constructorDescription}> {t('home.constructorName')} </p>
        </div>
        <Link to={pathToConstructor}>
          <Button className={styles.buttonStyles}> {t('home.createStyle')} </Button>
        </Link>
      </div>
      <div className={styles.playerSoundControl}>
        {isZeroVolume ? (
          <VolumeUpIcon
            onClick={() => {
              setIsZeroVolume(0);
              setIsMuted(true);
            }}
          />
        ) : (
          <VolumeOffIcon
            onClick={() => {
              setIsZeroVolume(1);
              setIsMuted(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ConstructorPreview;
