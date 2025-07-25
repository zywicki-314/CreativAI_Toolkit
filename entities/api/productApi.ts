import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import OpenAI from "openai";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    getChat: builder.mutation<
      any,
      {
        messages: OpenAI.Chat.ChatCompletionUserMessageParam[];
      }
    >({
      query: (body) => ({
        url: "/api/chat",
        method: "POST",
        body,
      }),
    }),
    getCode: builder.mutation<
      any,
      {
        messages: OpenAI.Chat.ChatCompletionUserMessageParam[];
      }
    >({
      query: (body) => ({
        url: "/api/code",
        method: "POST",
        body,
      }),
    }),
    getImage: builder.mutation<
      { revised_prompt: string; url: string }[],
      {
        prompt: string;
        size: string;
        amount: string;
        model: string;
      }
    >({
      query: (body) => ({
        url: "/api/image",
        method: "POST",
        body,
      }),
    }),
    generateAudio: builder.mutation<
      { url: string },
      {
        prompt: string;
      }
    >({
      query: (body) => ({
        url: "/api/audio",
        method: "POST",
        body,
      }),
    }),
    generateVideo: builder.mutation<
      string,
      {
        prompt: string;
      }
    >({
      query: (body) => ({
        url: "/api/video",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetChatMutation,
  useGetCodeMutation,
  useGetImageMutation,
  useGenerateAudioMutation,
  useGenerateVideoMutation,
} = productApi;
