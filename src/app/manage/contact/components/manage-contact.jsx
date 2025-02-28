"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Trash2, Eye, Loader2, Search, RefreshCw } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function ContactAdmin() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact`
      );
      if (response.data.status) {
        setMessages(response.data.data);
      }
    } catch (error) {
      toast("Failed to fetch contact messages");
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const fetchMessageDetails = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/${id}`
      );
      if (response.data.status) {
        setSelectedMessage(response.data.data);
        setIsModalOpen(true);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch message details",
        variant: "destructive",
      });
    }
  };

  const deleteMessage = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/${id}`
      );
      if (response.data.status) {
        toast("Message deleted successfully");
        fetchMessages();
      }
    } catch (error) {
      toast("Failed to delete message");
    } finally {
      setIsDeleteDialogOpen(false);
      setMessageToDelete(null);
    }
  };

  const handleDeleteClick = (id) => {
    setMessageToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <div className=" mx-auto py-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-primary text-[24px]">
              Contact Messages
            </CardTitle>
            <CardDescription>
              Manage all contact form submissions
            </CardDescription>
          </div>
          <Button onClick={fetchMessages} variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email or subject..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Badge variant="outline">{filteredMessages.length} messages</Badge>
          </div>

          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2">Loading messages...</span>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMessages.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        No messages found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMessages.map((message) => (
                      <TableRow key={message._id}>
                        <TableCell className="font-medium">
                          {message.name}
                        </TableCell>
                        <TableCell>{message.email}</TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {message.subject}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => fetchMessageDetails(message._id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleDeleteClick(message._id)}
                              className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Message Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
            <DialogDescription>
              Viewing complete message from {selectedMessage?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedMessage && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium text-right">Name:</span>
                <span className="col-span-3">{selectedMessage.name}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium text-right">Email:</span>
                <span className="col-span-3">{selectedMessage.email}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium text-right">Subject:</span>
                <span className="col-span-3">{selectedMessage.subject}</span>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <span className="font-medium text-right">Message:</span>
                <div className="col-span-3 whitespace-pre-wrap rounded-md border bg-muted/50 p-3">
                  {selectedMessage.message}
                </div>
              </div>
              {selectedMessage.createdAt && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium text-right">Received:</span>
                  <span className="col-span-3">
                    {format(new Date(selectedMessage.createdAt), "PPpp")}
                  </span>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setIsModalOpen(false);
                if (selectedMessage) {
                  handleDeleteClick(selectedMessage._id);
                }
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              contact message.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => messageToDelete && deleteMessage(messageToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
