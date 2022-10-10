import { PropsWithChildren } from 'react';
import { VStack, Text, Popover, Pressable, ITextProps, IPopoverProps } from 'native-base';

import { HelpIcon } from '@app/components/icons';

type Props = {
  title?: string;
  _body?: ITextProps;
  children: string;
  placement?: IPopoverProps['placement'];
};

function HintIcon({ title, _body, children, placement }: PropsWithChildren<Props>) {
  return (
    <Popover
      placement={placement}
      trigger={triggerProps => {
        return (
          <Pressable {...triggerProps}>
            <HelpIcon />
          </Pressable>
        );
      }}
    >
      <Popover.Content accessibilityLabel={title} w="100%">
        <Popover.Arrow />
        {title ? <Popover.Header>{title}</Popover.Header> : <></>}
        <Popover.Body>
          <VStack>
            <Text color="gray.500" {..._body}>
              {children}
            </Text>
          </VStack>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}

export default HintIcon;
