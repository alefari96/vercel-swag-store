import { getPromotions } from "@/lib/api";
import { Typography } from "@/components/ui/typography";

export async function PromotionBanner() {
  const { data: promotions } = await getPromotions();

  if (!promotions.active) {
    return null;
  }

  return (
    <div className="flex bg-primary text-primary-foreground p-4 items-center justify-center gap-4">
      <Typography variant="h4">{promotions.title}</Typography>
      <Typography variant="p">{promotions.description}</Typography>
    </div>
  );
}