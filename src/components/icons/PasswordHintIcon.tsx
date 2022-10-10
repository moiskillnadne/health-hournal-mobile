import { VStack, Text, Popover, Pressable } from 'native-base';

import { HelpIcon } from '@app/components/icons';

function PasswordHintIcon() {
  return (
    <Popover
      placement="top"
      trigger={triggerProps => {
        return (
          <Pressable {...triggerProps}>
            <HelpIcon />
          </Pressable>
        );
      }}
    >
      <Popover.Content accessibilityLabel="The password should have:" w="100%">
        <Popover.Arrow />
        <Popover.Header>The password should have:</Popover.Header>
        <Popover.Body>
          <VStack>
            <Text color="gray.500">{'\u2022' + ' '}at least 8 characters</Text>
            <Text color="gray.500">{'\u2022' + ' '}lowercase letters (a-z)</Text>
            <Text color="gray.500">{'\u2022' + ' '}at least one uppercase letter (A-Z)</Text>
            <Text color="gray.500">{'\u2022' + ' '}at least one number</Text>
            <Text color="gray.500">{'\u2022' + ' '}no spaces</Text>
          </VStack>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}

export default PasswordHintIcon;
