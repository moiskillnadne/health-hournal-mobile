import { useNavigate } from 'react-router-native';

import { ArrowIcon } from './icons';

type Props = {
  onBeforeNavigation?: () => Promise<any>;
};

function BackArrow({ onBeforeNavigation }: Props) {
  const navigate = useNavigate();

  function back() {
    if (onBeforeNavigation) {
      onBeforeNavigation().then((canNavigate: boolean) => canNavigate && navigate(-1));
    } else {
      navigate(-1);
    }
  }

  return <ArrowIcon onPress={back} />;
}

export default BackArrow;
