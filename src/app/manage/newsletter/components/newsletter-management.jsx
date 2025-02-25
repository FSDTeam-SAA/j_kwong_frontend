"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function NewsletterDashboard() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    sub: "",
    body: "",
  });

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/newsletters`
      );
      setSubscribers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      toast("Failed to load subscribers");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/newsletters/send`,
        formData
      );
      toast("Newsletter sent successfully");
      setFormData({ sub: "", body: "" });
    } catch (error) {
      console.error("Error sending newsletter:", error);
      toast("Failed to send newsletter");
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Send Newsletter</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="sub" className="text-sm font-medium">
              Subject
            </label>
            <Input
              id="sub"
              name="sub"
              value={formData.sub}
              onChange={handleChange}
              required
              placeholder="Newsletter subject"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="body" className="text-sm font-medium">
              Content
            </label>
            <Textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              required
              placeholder="Newsletter content"
              className="min-h-[100px]"
            />
          </div>
          <Button type="submit" disabled={sending}>
            {sending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {sending ? "Sending..." : "Send Newsletter"}
          </Button>
        </form>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Subscribers</h2>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="border rounded-lg">
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribers &&
                  subscribers.map((subscriber) => (
                    <TableRow key={subscriber._id}>
                      <TableCell>{subscriber.email}</TableCell>
                    </TableRow>
                  ))}
                {subscribers.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      className="text-center text-muted-foreground"
                    >
                      No subscribers found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
