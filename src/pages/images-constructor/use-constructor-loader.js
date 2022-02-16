import { useRef, useState, useEffect } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { getAllConstructors } from './operations/getAllConstructors.queries';
import { getConstructorByModel } from './operations/getConstructorByModel.queries';

const useConstructorLoader = () => {
  const [constructorValues, setConstructorValues] = useState({});
  const [constructorModel, setConstructorModel] = useState('');
  const currentConstructorModel = useRef({});
  const allModels = useRef([]);

  const [allPrices, setAllPrice] = useState({});
  const [valuesLoading, setValuesLoading] = useState(true);

  const { data: constructors, error: constructorsError } = useQuery(getAllConstructors, {
    variables: {
      limit: 0,
      skip: 0
    }
  });

  const [
    getConstructorByModelHandler,
    { data: constructorByModel, refetch, called, constructorError }
  ] = useLazyQuery(getConstructorByModel, {
    variables: {
      id: constructorModel
    }
  });

  useEffect(() => {
    if (constructors) {
      allModels.current = constructors.getAllConstructors.items.map((item) => item.model);
      setConstructorModel(constructors.getAllConstructors.items[0].model._id);
      currentConstructorModel.current = constructors.getAllConstructors.items[0];
    }
  }, [constructors]);

  useEffect(() => {
    if (constructorByModel) {
      const pocket =
        constructorByModel.getConstructorByModel[0].pocketsWithRestrictions[0]
          ?.currentPocketWithPosition?.pocket;

      const values = {
        name: constructorByModel.getConstructorByModel[0].name,
        size: constructorByModel.getConstructorByModel[0].model.sizes[0],
        pattern: constructorByModel.getConstructorByModel[0].patterns[0],
        bottom: constructorByModel.getConstructorByModel[0].bottoms[0],
        basic: constructorByModel.getConstructorByModel[0].basics[0],
        model: constructorByModel.getConstructorByModel[0].model,
        pocket
      };

      setConstructorValues(values);

      currentConstructorModel.current = constructorByModel.getConstructorByModel[0];

      currentConstructorModel.current.model && setValuesLoading(false);
    }
  }, [constructorByModel]);

  useEffect(() => {
    !called && constructorModel && getConstructorByModelHandler();
    called && refetch();
  }, [constructorModel]);

  return {
    constructorValues,
    setConstructorValues,
    constructorModel,
    setConstructorModel,
    currentConstructorModel,
    allPrices,
    setAllPrice,
    allModels,
    valuesLoading,
    constructorsError,
    constructorError
  };
};

export default useConstructorLoader;
