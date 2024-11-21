"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { ChevronsUpDown, X } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const ingredientsData = [
  { value: "tomato", label: "Tomato" },
  { value: "onion", label: "Onion" },
  { value: "garlic", label: "Garlic" },
  { value: "pepper", label: "Pepper" },
  { value: "carrot", label: "Carrot" },
  { value: "potato", label: "Potato" },
  { value: "chicken", label: "Chicken" },
  { value: "beef", label: "Beef" },
  { value: "fish", label: "Fish" },
  { value: "rice", label: "Rice" },
  { value: "pasta", label: "Pasta" },
  { value: "basil", label: "Basil" },
  { value: "oregano", label: "Oregano" },
  { value: "thyme", label: "Thyme" },
  { value: "parsley", label: "Parsley" },
  { value: "cilantro", label: "Cilantro" },
  { value: "olive oil", label: "Olive Oil" },
  { value: "butter", label: "Butter" },
  { value: "flour", label: "Flour" },
  { value: "milk", label: "Milk" },
  { value: "cheese", label: "Cheese" },
  { value: "egg", label: "Egg" },
  { value: "bread", label: "Bread" },
  { value: "salt", label: "Salt" },
  { value: "blackpepper", label: "Black Pepper" },
  { value: "sugar", label: "Sugar" },
  { value: "honey", label: "Honey" },
  { value: "lemon", label: "Lemon" },
  { value: "lime", label: "Lime" },
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "strawberry", label: "Strawberry" },
  { value: "blueberry", label: "Blueberry" },
  { value: "spinach", label: "Spinach" },
  { value: "lettuce", label: "Lettuce" },
  { value: "cucumber", label: "Cucumber" },
  { value: "zucchini", label: "Zucchini" },
  { value: "mushroom", label: "Mushroom" },
  { value: "ginger", label: "Ginger" },
  { value: "chili", label: "Chili" },
  { value: "soy sauce", label: "Soy Sauce" },
  { value: "vinegar", label: "Vinegar" },
  { value: "cinnamon", label: "Cinnamon" },
  { value: "nutmeg", label: "Nutmeg" },
  { value: "vanilla", label: "Vanilla" },
  { value: "chocolate", label: "Chocolate" },
  { value: "cream", label: "Cream" },
  { value: "yogurt", label: "Yogurt" },
  { value: "corn", label: "Corn" },
  { value: "peas", label: "Peas" },
  { value: "beans", label: "Beans" },
  { value: "lentils", label: "Lentils" },
  { value: "coconut milk", label: "Coconut Milk" },
  { value: "shrimp", label: "Shrimp" },
  { value: "crab", label: "Crab" },
  { value: "lobster", label: "Lobster" },
  { value: "tofu", label: "Tofu" },
  { value: "cabbage", label: "Cabbage" },
  { value: "broccoli", label: "Broccoli" },
  { value: "cauliflower", label: "Cauliflower" },
  { value: "pumpkin", label: "Pumpkin" },
  { value: "chickpeas", label: "Chickpeas" },
  { value: "avocado", label: "Avocado" },
].sort((a, b) => a.label.localeCompare(b.label));

const peopleData = [1, 2, 4, 6, 8];

const SearchBox = ({
  onSearch,
}: {
  onSearch: (people: string, items: string[]) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [people, setPeople] = useState<string>("2");
  const [items, setItems] = useState<string[]>([]);

  const handleSelectItem = (value: string) => {
    if (value === "" || items.includes(value) || items.length > 5) return;
    setItems([...items, value]);
  };

  function handleDeleteItem(item: string) {
    setItems(items.filter((i) => i !== item));
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 max-w-xl">
      <div className="flex flex-col gap-2">
        <div className="font-bold text-xl">How many people?</div>
        <Select onValueChange={setPeople} value={people}>
          <SelectTrigger className="bg-background w-full">
            <SelectValue placeholder="Selecciona un periodo" />
          </SelectTrigger>
          <SelectContent>
            {peopleData.map((people) => (
              <SelectItem key={people} value={people.toString()}>
                for {people} {people > 1 ? "people" : "person"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <div className="font-bold text-xl">Choose your ingredients</div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-between">
              Select ingredients...
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-[200px]">
            <Command>
              <CommandInput
                placeholder="Start typing to add ingredients…"
                className="h-9"
              />
              <CommandList>
                <CommandEmpty>No ingredient found.</CommandEmpty>
                <CommandGroup>
                  {ingredientsData.map((ingredient) => (
                    <CommandItem
                      key={ingredient.value}
                      value={ingredient.value}
                      onSelect={() => {
                        handleSelectItem(ingredient.label);
                        setOpen(false);
                      }}
                    >
                      {ingredient.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="text-muted-foreground text-sm">
          Choose 2 to 6 ingredients to cook with
        </div>
      </div>

      <div className="justify-center gap-2 grid grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              exit={{ scale: [1, 0.9, 1.2, 0.5, 0.0], x: 500, opacity: [1, 0] }}
              key={item}
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "flex items-center justify-between gap-2 select-none shadow-md"
              )}
              initial={{ scale: 0.1, x: -500 }}
              animate={{ scale: [1, 1.2, 0.9, 1], x: 0 }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              {item}
              <motion.button
                whileHover={{ scale: 1.5 }}
                className="text-destructive"
                onClick={() => handleDeleteItem(item)}
              >
                <X className="size-4" />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.button
        disabled={items.length < 2}
        onClick={() => onSearch(people, items)}
        layout
        className={cn(
          buttonVariants({ variant: "default", size: "lg" }),
          "w-full font-semibold text-lg w-auto",
          "bg-gradient-to-b from-[#cc0000] via-[#d33a3a] to-[#cc0000]",
          "hover:scale-110 active:scale-95"
        )}
        animate={{
          rotate: 360,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          duration: 0.1,
        }}
        whileHover={{
          scale: 1.1,
          borderRadius: "10px",
          backgroundColor: "red",
        }}
      >
        Give me recipes!
      </motion.button>
    </div>
  );
};

export default SearchBox;
