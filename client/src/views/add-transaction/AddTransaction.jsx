import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Select,
  Input,
  Tag,
  Center,
  InputGroup,
  InputLeftElement,
  Button,
  useToast,
} from "@chakra-ui/react";

import { Loading, HScroll, PageHeader } from "../../components";
import { useAppContent } from "../../contexts/AppContext";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { nullCheck, capitalizeFirstLetter } from "../../utils/common-util";
import { fetchLocalStorageData } from "../../utils/local-storage";
const blankFormInputs = () => {
  return {
    type: "expense",
    category: "",
    amount: 0.0,
    title: "",
    description: "",
  };
};

export const AddTransaction = () => {
  const toast = useToast();
  const { user } = useAuth();
  const { categories, setCategories, friends } = useAppContent();

  const [filteredCategory, setFilteredCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formInputs, setFormInputs] = useState(blankFormInputs);

  const { response } = useAxios({
    method: "get",
    url: `/api/v1/categories/${user.id}`,
  });

  useEffect(() => {
    setCategories(response?.data.length > 0 ? response.data : []);
  }, [response]);

  const onChangeHandler = (e) => {
    if (e.target.name === "category") {
      const categoryInput = e.target.value;
      categoryInput.length > 0
        ? setFilteredCategory(
            categories.filter((obj) =>
              obj.category.toLowerCase().includes(categoryInput.toLowerCase())
            )
          )
        : setFilteredCategory([]);
    }
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  const onSelectTag = (cat) => {
    setFormInputs({
      ...formInputs,
      category: cat,
    });
  };

  const validateInput = () => {
    const error = [];
    Object.keys(formInputs).forEach((key) => {
      if (nullCheck(formInputs[key])) {
        error.push(capitalizeFirstLetter(key));
      }
    });
    return error;
  };

  const saveTransactionDetails = (e) => {
    e.preventDefault();
    const error = validateInput();
    if (error.length === 0) {
      setIsLoading(true);
      const token = fetchLocalStorageData("user").token;
      axios
        .post(
          "/api/v1/expenses/create",
          JSON.parse(JSON.stringify(formInputs)),
          {
            headers: {
              Authentication: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          const responseData = res.data;
          toast({
            title: "Transaction added",
            description: "We have saved your details",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setFormInputs(blankFormInputs);
        })
        .catch((err) => {
          toast({
            title: "Transaction failed",
            description: `Some issue while svaing the transaction ${err.toString()}`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      toast({
        title: "Invalid inputs",
        description: `Please fix ${error.join(", ")} fields`,
        status: "error",
        duration: 10000,
        isClosable: true,
      });
    }
  };

  if (isLoading) return <Loading />;

  return (
    <Box>
      <PageHeader title="Add Transaction" />
      <Box>
        <Box paddingBottom={2}>
          <Text mb="4px">Type</Text>
          <Select
            name="type"
            value={formInputs.type}
            onChange={onChangeHandler}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Select>
        </Box>
        <Box paddingBottom={2} overflow={"hidden"}>
          <Text mb="4px">Category</Text>
          <Input
            name="category"
            value={formInputs.category}
            onChange={onChangeHandler}
          />
          <HScroll>
            {(filteredCategory.length > 0 ? filteredCategory : categories).map(
              (obj, index) => (
                <Tag
                  key={index}
                  marginTop={2}
                  marginRight={2}
                  fontSize={16}
                  padding={2.5}
                  onClick={() => onSelectTag(obj.category)}
                >
                  {obj.category}
                </Tag>
              )
            )}
          </HScroll>
        </Box>
        <Box paddingBottom={2} overflow={"hidden"}>
          <Text mb="4px">Title</Text>
          <Input name="title" onChange={onChangeHandler} />
        </Box>
        <Box paddingBottom={2} overflow={"hidden"}>
          <Text mb="4px">Amount</Text>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="£"
              type="number"
            />
            <Input name="amount" onChange={onChangeHandler} />
          </InputGroup>
        </Box>
        <Box paddingBottom={2} overflow={"hidden"}>
          <Text mb="4px">Description</Text>
          <Input name="description" onChange={onChangeHandler} />
        </Box>
        <Center paddingTop={4}>
          <Button onClick={saveTransactionDetails}>Add</Button>
        </Center>
      </Box>
    </Box>
  );
};
