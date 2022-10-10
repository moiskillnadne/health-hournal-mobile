import { Center, Image } from 'native-base';

import { LogoImage } from '@assets/images';

function Logo() {
  return (
    <Center safeAreaBottom _android={{ mb: '30px' }} mt="30px">
      <Image source={LogoImage} style={{ width: 50, height: 50 }} alt="logo" />
    </Center>
  );
}

export default Logo;
