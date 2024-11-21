"use server";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function generateRecipe(people: string, ingredients: string[]) {
  const prompt = `Write 2 recipes for ${people}, with the following ingredients: ${ingredients.join(
    ", "
  )}. After the recipes, recommend 2 music albums that would go well with the recipes. At the end of the response, write "Enjoy your meal!"`;

  try {
    const response = await generateText({
      model: google("gemini-1.5-flash-latest"),
      system: `You are a chef that generates recipes based mainly on the ingredients provided. Be creative and think outside the box. 
            The recipes should be different from each other. Use a little humor in your instructions (Don't exaggerate either).
            The text should be in HTML format. Do not include backticks (\`\`\`) or "html" tags outside of the <div>. 
            Use tailwindcss to style the text. Do not use shadow styles. Don't use border styles.
            Don't include images. Leave a gap of 2 lines between the recipes and the music recommendations. Don't use shadow styles.
            Put a <hr/> tag between the recipes and the music recommendations.
            `,
      prompt,
    });

    return {
      error: null,
      text: response.text.replace(/```html|```/g, "").trim(),
    };
  } catch (error) {
    console.error(error);
    return {
      error:
        "An error occurred while generating the recipes. Please try again.",
      text: null,
    };
  }
}
