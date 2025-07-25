"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetImageMutation } from "@/entities/api/productApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download } from "lucide-react";
import Image from "next/image";

import React, { FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  prompt: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  size: z.string().min(2),
  amount: z.string(),
  model: z.string(),
});

const IMAGE_AMOUNT = [
  {
    label: "1 Photo",
    value: "1",
  },
  {
    label: "2 Photos",
    value: "2",
  },
  {
    label: "3 Photos",
    value: "3",
  },
  {
    label: "4 Photos",
    value: "4",
  },
];
const IMAGE_AMOUNT_DALL_3 = [
  {
    label: "1 Photo",
    value: "1",
  },
];

const IMAGE_SIZES_DALL_3 = [
  {
    label: "1024x1024",
    value: "1024x1024",
  },
  {
    label: "1024x1792",
    value: "1024x1792",
  },
  {
    label: "1792x1024",
    value: "1792x1024",
  },
];
const IMAGE_SIZES_DALL_2 = [
  {
    label: "256x256",
    value: "256x256",
  },
  {
    label: "512x512",
    value: "512x512",
  },
  {
    label: "1024x1024",
    value: "1024x1024",
  },
];

const IMAGE_MODEL = [
  {
    label: "DALL 3",
    value: "dall-e-3",
  },
  {
    label: "DALL 2",
    value: "dall-e-2",
  },
];

interface IProductImageFormProps {}

const ProductImageForm: FC<IProductImageFormProps> = ({}) => {
  const messagesEndRef = useRef(null);

  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      model: "dall-e-3",
      size: "1024x1024",
    },
  });

  const [getImage, { isSuccess, data, isLoading }] = useGetImageMutation();

  useEffect(() => {
    if (isSuccess && data) {
      setImages(data.map((item) => item.url));
    }
  }, [isSuccess, data]);

  useEffect(() => {
    scrollToBottom();
  }, [images]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    scrollToBottom();
    getImage({
      prompt: values.prompt,
      amount: values.amount,
      size: values.size,
      model: values.model,
    });
    form.reset();
  };

  return (
    <div className="px-4 md:w-[70%] md:mx-auto">
      <ScrollArea className=" h-[65vh]">
        <div className="flex flex-col items-center gap-4 md:flex-row flex-wrap">
          {images.map((imageUrl) => (
            <Card key={imageUrl} className="w-fit">
              <CardContent>
                <div className="w-[256px] h-[256px] relative aspect-square">
                  <Image src={imageUrl} alt="image" fill />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => window.open(imageUrl)}
                  className="w-full"
                  variant="secondary"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>
      {isLoading && <div>Loading...</div>}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-2">
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {IMAGE_MODEL.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-2">
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {IMAGE_AMOUNT.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={String(option.value)}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
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
          ></FormField>
          <Button type="submit" className="w-full">
            Wysłać
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProductImageForm;
