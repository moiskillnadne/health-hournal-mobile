import { Button, IButtonProps } from 'native-base';

type Props = {
  price: string;
  packageName: string;
} & IButtonProps;

export default function ({ price, packageName, ...props }: Props) {
  return (
    <Button
      bgColor="white"
      py={4}
      justifyContent="flex-start"
      _text={{ color: 'black', fontWeight: 'medium' }}
      {...props}
    >
      {`${price} / ${packageName}`}
    </Button>
  );
}
