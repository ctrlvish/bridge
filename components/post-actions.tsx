import { Heart, MessageCircle } from "lucide-react";
import SharePostButton from "@/components/share-post-button";

interface PostActionsProps {
  postId: string;
  likeCount?: number;
  commentCount?: number;
  bordered?: boolean;
}

export default function PostActions(props: PostActionsProps) {
  const { postId, likeCount = 0, commentCount = 0, bordered = false } = props;

  return (
    <div
      className={
        bordered
          ? "mt-6 flex items-center gap-5 border-t border-border pt-4 text-muted-foreground"
          : "relative z-10 mt-4 flex items-center gap-5 text-muted-foreground"
      }
    >
      <button className="flex items-center gap-1.5 text-sm transition-colors hover:text-primary">
        <Heart className="h-4 w-4" />
        <span>{likeCount}</span>
      </button>
      <button className="flex items-center gap-1.5 text-sm transition-colors hover:text-primary">
        <MessageCircle className="h-4 w-4" />
        <span>{commentCount}</span>
      </button>
      <SharePostButton postId={postId} />
    </div>
  );
}
