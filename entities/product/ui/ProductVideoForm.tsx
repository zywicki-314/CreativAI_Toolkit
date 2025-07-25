"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGenerateVideoMutation } from "@/entities/api/productApi";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  prompt: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

interface IProductVideoFormProps {}

const ProductVideoForm: FC<IProductVideoFormProps> = ({}) => {
  const [video, setVideo] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const [generateVideo, { isSuccess, data, isLoading }] =
    useGenerateVideoMutation();

  useEffect(() => {
    if (isSuccess && data) {
      const videoUrl = data.url;
      setVideo(videoUrl);
    }
  }, [isSuccess, data]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setVideo(undefined);
    generateVideo({
      prompt: values.prompt,
    });
    form.reset();
  };

  return (
    <div className="px-4 md:w-[70%] md:mx-auto">
      <div>
        {video && (
          <video controls className="w-full">
            <source src={video} type="video/mp4" />
          </video>
        )}
        {!video && <div>wygenerujmy razem coś nowego :)</div>}
      </div>
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

export default ProductVideoForm;
