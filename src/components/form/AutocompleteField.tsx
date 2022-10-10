import { useRef, useMemo, useEffect, useLayoutEffect, useState } from 'react';
import { TextInput, Platform } from 'react-native';
import {
  FormControl,
  StyledProps,
  Actionsheet,
  Pressable,
  FlatList,
  Spinner,
  KeyboardAvoidingView,
  Input,
} from 'native-base';
import { useController, useFormContext } from 'react-hook-form';

import { useKeyboardBottomInset } from '@app/hooks';

import { isLastItem } from '@app/utils';

import AppInput from '../Input';

type Props = {
  label?: string;
  name: string;
  defaultOption?: string;
  options: string[];
  isLoading?: boolean;
  LeftElement?: JSX.Element;
  RightElement?: JSX.Element;
  isDisabled?: boolean;

  onSearch?: (text: string) => unknown;
  loadData: () => unknown;
} & StyledProps;

function AutocompleteField(props: Props) {
  const {
    label,
    name,
    LeftElement,
    RightElement,
    options,
    defaultOption,
    isLoading,
    onSearch,
    loadData,
    isDisabled = false,
    ...styleProps
  } = props;

  const onSearchCb = useRef(onSearch);
  const searchFieldRef = useRef<TextInput>();

  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filteredOptions = useMemo(
    () =>
      onSearch
        ? options
        : options.filter(option => option.match(new RegExp(searchText.trim(), 'i'))),
    [onSearch, searchText, options],
  );

  const { control, setFocus } = useFormContext();

  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: defaultOption,
  });

  const bottomInset = useKeyboardBottomInset();

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function changeSearchText(text: string) {
    const onSearch = onSearchCb.current;

    if (text != null && onSearch) {
      onSearch(text.trim());
    }
    setSearchText(text);
  }

  function select(option: string) {
    onChange(option);
    close();
  }

  useEffect(() => {
    onSearchCb.current = onSearch;
  });

  useLayoutEffect(() => {
    if (isOpen && Platform.OS === 'ios') {
      searchFieldRef.current?.focus();
    }
  }, [isOpen, setFocus, name]);

  return (
    <FormControl isInvalid={!!error} {...styleProps}>
      <Pressable onPress={open}>
        <AppInput
          label={label}
          error={error}
          LeftElement={LeftElement}
          RightElement={RightElement}
          value={value}
          isDisabled={isDisabled}
          isReadOnly
          ref={ref}
        />
      </Pressable>

      <Actionsheet isOpen={isOpen} onClose={close} safeAreaTop h="full">
        <Pressable h="full" w="full" onPress={close}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            w="full"
            h="full"
          >
            <Actionsheet.Content
              bgColor="white"
              _android={{
                bottom: bottomInset ? undefined : -110,
              }}
              _ios={{
                bottom: bottomInset ? undefined : -100,
              }}
              h="full"
            >
              <Input
                value={searchText}
                placeholder="Search medications"
                onChangeText={changeSearchText}
                ref={searchFieldRef}
              />

              <FlatList
                w="full"
                h="full"
                data={filteredOptions}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (
                  <>
                    <Actionsheet.Item onPress={() => select(item)}>{item}</Actionsheet.Item>

                    {isLoading && isLastItem(filteredOptions, item) && <Spinner mt={4} size="lg" />}
                  </>
                )}
                onEndReached={onSearch ? loadData : undefined}
                onEndReachedThreshold={0.2}
              />
            </Actionsheet.Content>
          </KeyboardAvoidingView>
        </Pressable>
      </Actionsheet>
    </FormControl>
  );
}

export default AutocompleteField;
