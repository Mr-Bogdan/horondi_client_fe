import { useHistory, useLocation } from 'react-router';
import { map } from 'lodash';
import { useTranslation } from 'react-i18next';

import { page, URL_QUERIES_NAME } from '../../configs';
import {
  CATERGORY_TEXT,
  MODEL_TEXT,
  PATTERN_TEXT
} from '../../translations/product-list.translations';

const useProductFilters = (filters, filterData) => {
  const { search } = useLocation();
  const { i18n } = useTranslation();
  const history = useHistory();

  const searchParams = new URLSearchParams(search);
  const language = i18n.language === 'ua' ? 0 : 1;
  const { category, patterns, models } = filters;

  const handleFilterChange = ({ target }, queryName, categoriesList) => {
    const query = searchParams.get(queryName);
    const currentCategory = categoriesList.find((el) => el.name[language].value === target.name);

    if (target.checked) {
      if (query) searchParams.set(queryName, query.concat(',', currentCategory._id));
      else searchParams.set(queryName, currentCategory._id);
    } else if (query) {
      searchParams.set(queryName, query.replace(currentCategory._id, ''));
    } else searchParams.set(queryName, '');

    history.push(`?${searchParams.toString()}`);
  };

  const handleFilterClear = (queryName) => {
    searchParams.set(page, 1);
    searchParams.delete(queryName);
    history.push(`?${searchParams.toString()}`);
  };
  return {
    categories: {
      filterName: CATERGORY_TEXT[language].value,
      productFilter: category || [],
      list: map(filterData.categories, (el) => el.name[language].value),
      categories: filterData.categories,
      clearFilter: () => handleFilterClear(URL_QUERIES_NAME.categoryFilter),
      filterHandler: (e) =>
        handleFilterChange(e, URL_QUERIES_NAME.categoryFilter, filterData.categories)
    },
    models: {
      filterName: MODEL_TEXT[language].value,
      productFilter: models || [],
      list: map(filterData.models, (model) => model.name[language].value),
      categories: filterData.models,
      clearFilter: () => handleFilterClear(URL_QUERIES_NAME.modelsFilter),
      filterHandler: (e) => handleFilterChange(e, URL_QUERIES_NAME.modelsFilter, filterData.models)
    },
    patterns: {
      filterName: PATTERN_TEXT[language].value,
      productFilter: patterns || [],
      list: map(filterData.patterns, (pattern) => pattern.name[language].value),
      categories: filterData.patterns,
      clearFilter: () => handleFilterClear(URL_QUERIES_NAME.patternsFilter),
      filterHandler: (e) =>
        handleFilterChange(e, URL_QUERIES_NAME.patternsFilter, filterData.patterns)
    }
  };
};

export default useProductFilters;
