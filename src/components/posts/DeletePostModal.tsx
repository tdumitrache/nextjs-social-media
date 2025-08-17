import { PostData } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import React from "react";
import { useDeletePostMutation } from "./mutations";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface DeletePostModalProps {
  post: PostData;
  isOpen: boolean;
  onClose: () => void;
}

const DeletePostModal = ({ post, isOpen, onClose }: DeletePostModalProps) => {
  const { mutate: deletePost, isPending } = useDeletePostMutation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Post</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => deletePost(post.id, { onSuccess: onClose })}
            disabled={isPending}
          >
            {isPending ? <Loader2 className="size-4 animate-spin" /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePostModal;
