import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import { useStyles } from './product-sort.styles';
import CountPerPage from '../count-per-page';
import {
  setSortByPrice,
  setSortByRate,
  setSortByPopularity
} from '../../../redux/products/products.actions';
import { URL_QUERIES_NAME, SORT_BY_SELECT_OPTIONS } from '../../../configs';
import { TEXT_FIELD_VARIANT } from '../../../const/material-ui';

const ProductSort = () => {
  const { t, i18n } = useTranslation();
  const styles = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const { sort, page, defaultPage } = URL_QUERIES_NAME;
  const query = searchParams.get(sort);
  const Sortname = {
    sortAsc: 'sortAsc',
    sortDesc: 'sortDesc',
    rate: 'rate',
    popularity: 'popularity'
  };
  useEffect(() => {
    SORT_BY_SELECT_OPTIONS.forEach(({ optionValue }) => {
      if (query === optionValue.name) {
        switch (query) {
          case Sortname.sortDesc: {
            dispatch(setSortByPrice(optionValue.value));
            break;
          }
          case Sortname.rate: {
            dispatch(setSortByRate(optionValue.value));
            break;
          }
          case Sortname.popularity: {
            dispatch(setSortByPopularity(optionValue.value));
            break;
          }
          case Sortname.sortAsc: {
            dispatch(setSortByPrice(optionValue.value));
            break;
          }
          default: {
            break;
          }
        }
      }
    });
  }, [dispatch, searchParams.toString()]);

  const selectHandler = (e) => {
    const { name } = JSON.parse(e.target.value);
    searchParams.set(sort, name);
    searchParams.set(page, defaultPage);
    history.push(`?${searchParams.toString()}`);
  };

  const sortByText = t('common.sortBy');
  const selectOptions = SORT_BY_SELECT_OPTIONS.map(({ lang, optionValue }) => (
    <option
      key={lang[1].value}
      value={JSON.stringify(optionValue)}
      selected={optionValue.name === query}
    >
      {i18n.language === 'ua' ? lang[0].value : lang[1].value}
    </option>
  ));

  return (
    <div data-cy='sort' className={styles.sortDiv}>
      <div>
        {sortByText}
        <TextField
          select
          SelectProps={{ native: true }}
          onChange={selectHandler}
          className={styles.root}
          variant={TEXT_FIELD_VARIANT.OUTLINED}
        >
          {selectOptions}
        </TextField>
      </div>
      <CountPerPage />
    </div>
  );
};

export default ProductSort;
