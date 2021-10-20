import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { useHistory, useLocation } from 'react-router';
import { URL_QUERIES_NAME } from '../../../../configs/index';

const HotItemFilter = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { search } = useLocation();

  const { isHotItemFilter, page, defaultPage } = URL_QUERIES_NAME;
  const searchParams = new URLSearchParams(search);
  const [hotItem, setHotItem] = useState(false);

  useEffect(() => {
    if (searchParams.get(isHotItemFilter)) {
      setHotItem(!hotItem);
    }
  }, [searchParams.toString()]);

  const handleChange = (event) => {
    if (event.target.checked) {
      searchParams.set(isHotItemFilter, event.target.checked);
    } else {
      searchParams.delete(isHotItemFilter);
      setHotItem(!hotItem);
    }
    searchParams.set(page, defaultPage);
    history.push(`?${searchParams.toString()}`);
  };

  return (
    <FormGroup data-cy='hot_item_filter'>
      <Typography id='isHot' gutterBottom>
        {t('common.popular')}:
        <Switch
          color='default'
          checked={hotItem}
          onChange={handleChange}
          name={isHotItemFilter}
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
      </Typography>
    </FormGroup>
  );
};

export default HotItemFilter;
