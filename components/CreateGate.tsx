import React, { useEffect, useRef, useState } from "react";
import { useWalletProvider } from "../context/WalletProvider";
import { PaymentReciever } from "../lib/PaymentReciever";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
  Select,
  useToast,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const CreateGate = () => {
  const { walletState } = useWalletProvider();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState("");
  const [flowRate, setFlowRate] = useState("");
  const [superToken, setSuperToken] = useState("fDAIx");
  const [timeHorizon, setTimeHorizon] = useState<"s" | "m" | "h">("s");

  const toast = useToast();

  const createGate = async (event) => {
    event.preventDefault();
    try {
      if (name.length === 0) {
        throw new Error("Please input a valid name");
      }
      if (flowRate.length === 0) {
        throw new Error("Please input a valid flow rate");
      }

      let parsedFlowRate = parseFloat(flowRate);

      // Assuming that user always inputs in hours, we just scale up if necessary
      switch (timeHorizon) {
        case "m": {
          parsedFlowRate = parsedFlowRate * 60;
        }
        case "s": {
          parsedFlowRate = parsedFlowRate * 3600;
        }
      }
      PaymentReciever.createGate(walletState, name, parsedFlowRate, superToken);
      toast({
        title: "Gate Created. Please wait for the transaction to be mined",
        status: "success",
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: `Unable to create gate. ${e.message}`,
        status: "warning",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Create New Gate
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Gate</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="gateName">Gate Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="gateName"
                type="text"
              />
              <FormHelperText>
                Tell us how you want to identify this gate by
              </FormHelperText>
              <div className="py-2"></div>
              <FormLabel htmlFor="flowRate">Flow Rate</FormLabel>
              <Input
                value={flowRate}
                onChange={(e) => setFlowRate(e.target.value)}
                id="flowRate"
                type="text"
              />
              <FormHelperText>
                How much {superToken} do you want to stream in / {timeHorizon}?
              </FormHelperText>
              <div className="py-2"></div>
              <FormLabel htmlFor="token">Token</FormLabel>
              <Select
                onChange={(e) => setSuperToken(e.target.value)}
                value={superToken}
                id="token"
                placeholder="Select Token"
              >
                <option value="fDAIx">fDAIx</option>
              </Select>
              <div className="py-2"></div>
              <FormLabel htmlFor="timehorizon">Time Horizon</FormLabel>
              <Select
                id="timehorizon"
                onChange={(e) =>
                  setTimeHorizon(e.target.value as "s" | "m" | "h")
                }
                value={timeHorizon}
                placeholder="Select Time Horizon"
              >
                <option value="s">Second</option>
                <option value="m">Minute</option>
                <option value="h">Hour</option>
              </Select>
              <div className="py-2"></div>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={(e) => {
                e.preventDefault();
                createGate(e);
                setName("");
                setFlowRate("");
                onClose();
              }}
            >
              Create Gate
            </Button>
            <Button onClick={onClose} variant="ghost">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateGate;
