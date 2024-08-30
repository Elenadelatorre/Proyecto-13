import { useToast } from '@chakra-ui/react';

const useToastMessage = () => {
  const toast = useToast();

  const showToast = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 4000,
      isClosable: true,
    });
  };

  return { showToast };
};

export default useToastMessage;
