"use client";
import { AutoComplete } from "@/components/ui/autocomplete";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { X } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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
];

const peopleData = [1, 2, 4, 6, 8];

const SearchBox = ({
  onSearch,
}: {
  onSearch: (people: string, items: string[]) => void;
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [people, setPeople] = useState<string>("2");
  const [items, setItems] = useState<string[]>([]);

  const handleSelectedValueChange = (value: string) => {
    if (value === "" || items.includes(value) || items.length > 5) return;
    setSelectedValue(value);
    setItems([...items, value]);
    setSearchValue("");
  };

  function handleDeleteItem(item: string) {
    setItems(items.filter((i) => i !== item));
    setSearchValue("");
  }

  async function handleClick() {
    onSearch(people, items);
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
        <AutoComplete
          selectedValue={selectedValue}
          onSelectedValueChange={handleSelectedValueChange}
          searchValue={searchValue}
          onSearchValueChange={setSearchValue}
          items={ingredientsData}
          placeholder="Search ingredients"
          emptyMessage="No ingredient found"
          className="w-full"
        />
        <div className="text-muted-foreground text-sm">
          Choose 2 to 6 ingredients to cook with
        </div>
      </div>

      <div className="justify-center gap-2 grid grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              exit={{ scale: [1, 0.9, 1.2, 0.5, 0.0] }}
              key={item}
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "flex items-center justify-between gap-2 select-none"
              )}
              initial={{ scale: 0.1 }}
              animate={{ scale: [1, 1.2, 0.9, 1] }}
              transition={{
                duration: 0.3,
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
        onClick={handleClick}
        layout
        className={cn(
          buttonVariants({ variant: "default", size: "lg" }),
          "hover:scale-110 active:scale-95 w-full"
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
        What do I cook with these ingredients?
      </motion.button>
    </div>
  );
};

export default SearchBox;
