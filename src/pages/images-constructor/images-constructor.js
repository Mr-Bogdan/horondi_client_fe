import React, { useRef, useMemo, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, FormControl, FormHelperText, NativeSelect } from '@material-ui/core';
import _ from 'lodash';
import { mergeImages } from 'horondi_merge_images';

import { useStyles } from './images-constructor.style';
import { setModelLoading } from '../../redux/images-constructor/constructor-model/constructor-model.actions';
import Loader from '../../components/loader';
import { useConstructor } from './hooks';
import { IMG_URL } from '../../configs';
import {
  currentCurrencyValue,
  constructorImageInput,
  constructorEndPrice,
  constructorPartPrice,
  constructorPartNames
} from '../../utils/constructor';
import Modal from '../../components/modal';
import ConstructorSubmit from './constructor-sumbit';

const ImagesConstructor = () => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const styles = useStyles();
  const { t } = useTranslation();
  const { values, images, prices, methods, language, currency } = useConstructor();
  const canvas = useRef({});
  const canvasH = 768;
  const canvasW = 768;

  const loadImages = (sources = []) =>
    new Promise((resolve) => {
      const loadedImages = sources.map(
        (source) =>
          new Promise((resolveImage, rejectImage) => {
            const img = new Image();
            img.onload = () => resolveImage(img);
            img.onerror = () => {
              rejectImage(new Error());
            };
            img.src = `${IMG_URL}${source}`;
          })
      );

      resolve(Promise.all(loadedImages).then((loadedImage) => loadedImage));
    });

  useLayoutEffect(() => {
    if (images.basicImage && images.patternImage && images.frontPocketImage && images.bottomImage) {
      loadImages([
        images.frontPocketImage,
        images.basicImage,
        images.bottomImage,
        images.patternImage
      ]).then((loadedImages) => {
        mergeImages(loadedImages, canvas.current, canvasW, canvasH);
        methods.dispatch(setModelLoading(false));
      });
    }
  }, [images.basicImage, images.patternImage, images.frontPocketImage, images.bottomImage]);

  const showModal = () => {
    setModalVisibility(true);
  };

  const onModalAction = (action) => {
    setModalVisibility(false);
  };

  const options = (obj) => (
    <option key={obj._id} value={obj._id}>
      {obj.name[language].value}
    </option>
  );
  const sizeOptions = (obj) => (
    <option key={obj._id} value={obj._id}>
      {obj.name}
    </option>
  );
  const availableModels = useMemo(() => _.map(values.models, options, [values.models, language]));

  const availableBasics = useMemo(() => _.map(values.basics, options, [values.basics, language]));

  const availableSizes = useMemo(() => _.map(values.sizes, sizeOptions));

  const availablePatterns = useMemo(() =>
    _.map(values.patterns, options, [values.patterns, language])
  );

  const availableBottoms = useMemo(() =>
    _.map(values.bottoms, options, [values.bottoms, language])
  );

  return (
    <div className={styles.constructorWrapper}>
      <div className={styles.headingWrapper}>
        <FormControl>
          <NativeSelect
            className={styles.mainHeader}
            name={constructorImageInput.MODEL}
            onChange={(e) => methods.changeModel(e.target.value)}
          >
            {availableModels}
          </NativeSelect>
          <FormHelperText>{t('constructor.titles.model')}</FormHelperText>
        </FormControl>
      </div>

      <div className={styles.contentWrapper}>
        <form className={styles.formWrapper}>
          <FormControl>
            <NativeSelect
              name={constructorImageInput.BASIC}
              onChange={(e) => methods.changeBasic(e.target.value)}
            >
              {availableBasics}
            </NativeSelect>
            <FormHelperText>{t('constructor.titles.basis')}</FormHelperText>
          </FormControl>
          <FormControl>
            <NativeSelect
              name={constructorImageInput.PATTERN}
              onChange={(e) => methods.changePattern(e.target.value)}
            >
              {availablePatterns}
            </NativeSelect>
            <FormHelperText>{t('constructor.titles.pattern')}</FormHelperText>
          </FormControl>
          <FormControl>
            <NativeSelect
              name={constructorImageInput.BOTTOM}
              onChange={(e) => methods.changeBottom(e.target.value)}
            >
              {availableBottoms}
            </NativeSelect>
            <FormHelperText>{t('constructor.titles.bottom')}</FormHelperText>
          </FormControl>
          <FormControl>
            <NativeSelect
              name={constructorImageInput.SIZE}
              onChange={(e) => methods.changeSize(e.target.value)}
            >
              {availableSizes}
            </NativeSelect>
            <FormHelperText>{t('constructor.titles.size')}</FormHelperText>
          </FormControl>
          <Button className={styles.button} onClick={showModal}>
            {t('constructor.titles.moreOptions')}
          </Button>
        </form>
        <div className={styles.imageContainer}>
          {values.modelLoading && <Loader />}
          <canvas
            style={{ display: values.modelLoading ? 'none' : 'block' }}
            className={styles.image}
            width={canvasW}
            height={canvasH}
            ref={canvas}
          />
        </div>
        <div className={styles.pricesInfoWrapper}>
          <h2 className={styles.headerWrapper}>{t('constructor.titles.totalPrice')}</h2>
          <div className={styles.textWrapper}>
            <ul>
              <li className={styles.priceItem}>
                <span>{t('constructor.titles.defaultPrice')}</span>
                <span>
                  {prices.DEFAULT_PRICE_VALUE}
                  {currentCurrencyValue(language, currency)}
                </span>
              </li>
              <div className={`${styles.line} ${styles.topLine}`} />

              {constructorPartPrice(
                prices.priceBasic,
                prices.priceGobelen,
                prices.priceBottom,
                prices.priceSize
              ).map((item, index) =>
                item ? (
                  <li key={index} className={styles.priceItem}>
                    <span>{constructorPartNames(!language)[index]}</span>
                    <span>
                      +{item}
                      {currentCurrencyValue(language, currency)}
                    </span>
                  </li>
                ) : (
                  <div key={index} />
                )
              )}
              <div className={`${styles.line} ${styles.bottomLine}`} />
            </ul>
          </div>
          <h2 className={styles.headerWrapper}>
            {t('constructor.titles.endPrice')}
            <span>
              {constructorEndPrice(prices.priceTotal)}
              {currentCurrencyValue(language, currency)}
            </span>
          </h2>
          <ConstructorSubmit />
        </div>
      </div>
      {modalVisibility && (
        <Modal
          className={styles.modal}
          setModalVisibility={setModalVisibility}
          onAction={onModalAction}
          isOpen={modalVisibility}
          language={language}
          isEmpty
          isFullscreen
          content={<h3>MODAL FOR CONSTRUCTOR</h3>}
        />
      )}
    </div>
  );
};

export default ImagesConstructor;
