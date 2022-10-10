import { Center, Heading, Text } from 'native-base';

type Props = {
  title: string;
  subTitle: string | JSX.Element;
  icon: JSX.Element;
};

const InfoBlock = (props: Props) => {
  return (
    <Center>
      {props.icon}

      <Heading mt="30" mb="2" color="white">
        {props.title}
      </Heading>

      <Text fontSize={16} textAlign="center" color="white">
        {props.subTitle}
      </Text>
    </Center>
  );
};

export default InfoBlock;
