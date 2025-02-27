"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2, Upload, Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { z } from "zod";
import axios from "axios";
import Cookies from "js-cookie";
import TiptapEditor from "./tiptap-editor";

const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Blog description is required"),
  category: z.string().min(1, "Category is required"),
  authorName: z.string().min(1, "Author name is required"),
  referenceUrl: z.array(z.string().or(z.literal(""))),
  date: z.date(),
  image: z.instanceof(File).or(z.string()).optional(),
});

export default function ArticleForm({ mode = "add", initialData }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`
        );
        if (response.data.status) {
          setCategories(response.data.data);
        }
        // console.log(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const form = useForm({
    resolver: zodResolver(blogFormSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          date: initialData.date ? new Date(initialData.date) : new Date(),
          referenceUrl: initialData.referenceUrl?.length
            ? initialData.referenceUrl
            : [""], // Ensure it's an array
        }
      : {
          title: "",
          description: "",
          category: "",
          authorName: "",
          referenceUrl: [""],
          date: new Date(),
          image: "",
        },
  });

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      // console.log("formData", formData);
      Object.keys(data).forEach((key) => {
        if (key === "image" && data[key] instanceof File) {
          formData.append("image", data[key]);
        }
        //  else if (key === "referenceUrl") {
        //   data[key].forEach((url, index) => {
        //     if (url) formData.append(`referenceUrl[${index}]`, url);

        //   });
        // }
        else {
          formData.append(key, data[key]);
        }
      });
      // console.log(formData);

      const endpoint =
        mode === "add"
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs/${initialData.slug}`;
      const method = mode === "add" ? "POST" : "PUT";
      // console.log("data", data);

      const response = await axios({
        method: method,
        url: endpoint,
        data: formData,
        withCredentials: true, // ⬅️ Ensures cookies (including auth token) are sent automatically
      });

      if (response.status) {
        router.push("/manage/article");
      } else {
        throw new Error("Failed to save the blog post.");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleImageUpload = (file) => {
    if (!file) return;
    form.setValue("image", file);
  };

  const addReferenceUrl = () => {
    const currentUrls = form.getValues("referenceUrl");
    form.setValue("referenceUrl", [...currentUrls, ""]);
  };

  const removeReferenceUrl = (index) => {
    const currentUrls = form.getValues("referenceUrl");
    form.setValue(
      "referenceUrl",
      currentUrls.filter((_, i) => i !== index)
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog image</FormLabel>
              <FormControl>
                <div
                  className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 h-[400px] bg-muted"
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                >
                  {field.value ? (
                    <div className="relative w-full h-full">
                      {/* {console.log(field.value)} */}
                      <img
                        src={
                          field.value instanceof File
                            ? URL.createObjectURL(field.value) // Generate preview URL for new uploads
                            : `${
                                process.env.NEXT_PUBLIC_API_URL
                              }${field.value.replace(/^uploads\//, "")}` // Use the custom base URL for existing images
                        }
                        alt="Blog image"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="absolute top-2 right-2 bg-red-500 text-white"
                        onClick={() => form.setValue("image", "")}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-primary hover:text-primary/80"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpload(e.target.files?.[0])
                            }
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter blog title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Description</FormLabel>
              <FormControl>
                <TiptapEditor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        isCategoriesLoading
                          ? "Loading categories..."
                          : "Select a category"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white">
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="authorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter author name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Reference URLs</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addReferenceUrl}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add URL
            </Button>
          </div>

          {form.watch("referenceUrl").map((_, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`referenceUrl.${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input placeholder="https://example.com" {...field} />
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeReferenceUrl(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        field.value.toLocaleDateString()
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {mode === "add" ? "Create Blog" : "Update Blog"}
        </Button>
      </form>
    </Form>
  );
}
