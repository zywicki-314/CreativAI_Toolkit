"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetCodeMutation } from "@/entities/api/productApi";
import { zodResolver } from "@hookform/resolvers/zod";

import OpenAI from "openai";
import React, { FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ReactMarkdown from "react-markdown";

const formSchema = z.object({
  prompt: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

interface IProductCodeFormProps {}

const ProductCodeForm: FC<IProductCodeFormProps> = ({}) => {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState<
    OpenAI.Chat.ChatCompletionMessageParam[]
  >([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const [getChat, { isSuccess, data, isLoading }] = useGetCodeMutation();

  useEffect(() => {
    if (isSuccess) {
      setMessages((prevMessage) => [...prevMessage, data]);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const userMessage: OpenAI.Chat.ChatCompletionUserMessageParam = {
      role: "user",
      content: values.prompt,
    };
    setMessages((prevMessage) => [...prevMessage, userMessage]);
    scrollToBottom();
    getChat({
      messages: [...messages, userMessage],
    });
    form.reset();
  };

  return (
    <div className="px-4 md:w-[70%] md:mx-auto">
      <ScrollArea className=" h-[65vh]">
        <div className="text-sm flex flex-col gap-3  p-4 rounded bg-blue-100">
          {!messages.length &&
            '"ai-helper 360" chętnie odpowie na każde twoje pytanie. Nad czym teraz się zastanawiasz?'}
          {messages.map((message, idx) => (
            <div key={`message${idx}`} className="flex gap-3">
              <div>
                <Avatar>
                  <AvatarFallback>
                    {message.role === "user" && "CU"}
                    {message.role === "assistant" && "AI"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <ReactMarkdown
                className="flex flex-col gap-2"
                components={{
                  pre: ({ node, ...props }) => (
                    <div className="bg-black/20 rounded-sm p-2 overflow-auto w-[350px] md:w-[700px]">
                      <pre {...props} />
                    </div>
                  ),
                  code: ({ ...props }) => (
                    <code
                      className="bg-black/70 text-[yellow] rounded-sm px-1"
                      {...props}
                    />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      {isLoading && <div>Loading...</div>}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Zacznij od najważniejszego ;)"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Wysłać
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProductCodeForm;
