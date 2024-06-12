import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { ButtonGroup, IconButton, Flex, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';

const InputEditable = ({
  value,
  onSubmit,
}: {
  value: string;
  onSubmit: (text: string) => void;
}) => {
  const [text, setText] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const submit = () => {
    setIsEditing(false);
    onSubmit(text);
  };
  return isEditing == false ? (
    <Flex justifyContent="space-between" gap="10px" grow="1">
      <Text noOfLines={1} bgColor="#9f9f9f" p="3px 10px" rounded="full">
        {text}
      </Text>
      <IconButton
        aria-label=""
        size="sm"
        icon={<EditIcon />}
        onClick={() => {
          setIsEditing(true);
        }}
      />
    </Flex>
  ) : (
    <Flex justifyContent="space-between" gap="10px" grow="1">
      <Input
        autoFocus
        rounded="full"
        size="sm"
        defaultValue={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <ButtonGroup>
        <IconButton
          aria-label=""
          size="sm"
          icon={<CheckIcon />}
          onClick={() => {
            submit();
          }}
        />
        <IconButton
          aria-label=""
          size="sm"
          icon={<CloseIcon />}
          onClick={() => {
            setIsEditing(false);
            setText(value);
          }}
        />
      </ButtonGroup>
    </Flex>
  );
};

export default InputEditable;
