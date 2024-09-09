import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel'
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

interface MenuProps {
    documentId: Id<"documents">;
}
export const Menu = ({documentId}: MenuProps) => {
    const { user } = useUser();
    const router = useRouter();

    const archive = useMutation(api.documents.archive);

    const onArchive = () => {
        const promise = archive({id: documentId});

        toast.promise(promise, {
            loading: "Moving to trash...",
            success: "Page moved to trash",
            error: "Failed to archive page"
        })
        router.push("/documents");
    }
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
            align="end"
            alignOffset={8}
            className='w-60'
            forceMount
        >
            <DropdownMenuItem onClick={onArchive}>
                <Trash className='h-4 w-4 mr-2' />
                Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="text-xs text-muted-foreground p-2">
                Last edited by: {user?.fullName}
            </div>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

Menu.Skeleton = function MenuSkeleton() {
    return (
        <Skeleton className='h-10 w-10' />
    )
}
