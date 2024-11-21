"use client";
import SearchBox from "./SearchBox";
import { generateRecipe } from "@/server/ai";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import parse from "html-react-parser";
import { motion } from "framer-motion";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
} from "./ui/alert-dialog";
import { LoaderPinwheel } from "lucide-react";
import { toast } from "react-hot-toast";
import Logo from "./Logo";

const SearchSection = () => {
  const [open, setOpen] = useState(false);
  const [recipes, setRecipes] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const onSearch = async (people: string, items: string[]) => {
    setLoading(true);

    const data = await generateRecipe(people, items);

    if (data.error) {
      toast.error(data.error);
    } else {
      setRecipes(data.text ?? "");
      setOpen(true);
    }

    setLoading(false);
  };

  return (
    <>
      <AlertDialog open={loading && recipes === null}>
        <AlertDialogContent className="flex flex-col justify-center items-center">
          <AlertDialogTitle>Generating recipes</AlertDialogTitle>
          <motion.div
            animate={{ rotate: 360, opacity: [0.8, 1, 0.8] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            <LoaderPinwheel className="text-brand size-36" />
          </motion.div>
          <div>This may take a while...</div>
        </AlertDialogContent>
      </AlertDialog>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center items-center gap-4 bg-background mb-8 max-w-xl text-foreground"
        >
          <Dialog
            open={open}
            onOpenChange={() => {
              setOpen(false);
              setRecipes(null);
            }}
          >
            <DialogHeader>
              <DialogTitle>Recipes</DialogTitle>
            </DialogHeader>
            <DialogContent className="max-h-[80vh] overflow-auto">
              <div className="flex flex-col justify-center items-center gap-4">
                <div className="prose">{parse(recipes ?? "")}</div>
                <Logo className="size-[80px]" />
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      )}
      <SearchBox onSearch={onSearch} />
    </>
  );
};

export default SearchSection;
