import { Link } from "react-router";
import { Button } from "../../../common/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../../common/components/ui/card";
import { Badge } from "../../../common/components/ui/badge";

interface JobCardProps {
  id: string;
  company: string;
  companyLogoUrl: string;
  companyHq: string;
  title: string;
  postedAt: string;
  type: string;
  salary: string;
  positionLocation: string;
}

export function JobCard({
  id,
  company,
  companyLogoUrl,
  companyHq,
  title,
  postedAt,
  type,
  salary,
  positionLocation,
}: JobCardProps) {
  return (
    <Link to={`/jobs/${id}`}>
      <Card className="bg-transparent hover:bg-card/50 transition-colors">
        <CardHeader>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={companyLogoUrl}
              alt={`${company} logo`}
              className="size-10 rounded-full"
            />
            <div className="space-x-2">
              <span className="text-accent-foreground">{company}</span>
              <span className="text-sm text-muted-foreground">{postedAt}</span>
            </div>
          </div>
          <CardTitle>
            <span className="text-2xl font-semibold">{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Badge>{type}</Badge>
          <Badge>{positionLocation}</Badge>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-accent-foreground">{salary}</span>
            <span className="text-sm text-muted-foreground">{companyHq}</span>
          </div>
          <Button variant="secondary" size="sm">
            <span>Apply now</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
