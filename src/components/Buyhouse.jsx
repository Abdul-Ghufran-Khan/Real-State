import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  preferredDate: z.date({ required_error: "Please select a preferred viewing date" }),
  budget: z.string().min(1, { message: "Please enter your budget" }),
  financing: z.string({ required_error: "Please select a financing option" }),
  additionalInfo: z.string().optional(),
})

const BuyHouse = () => {
  const [selectedHouse, setSelectedHouse] = useState(null)
  const [open, setOpen] = useState(false)

  const houses = [
    {
      image: "https://i.pinimg.com/474x/0b/06/c4/0b06c4a42c2d66d765e94bc268981d5c.jpg",
      price: "$250,000",
      beds: 3,
      baths: 2,
      sqft: 1800,
      location: "New York, NY",
    },
    {
      image: "https://i.pinimg.com/474x/95/8f/1d/958f1da47a87363d203b048bee3b48f4.jpg",
      price: "$320,000",
      beds: 4,
      baths: 3,
      sqft: 2200,
      location: "Los Angeles, CA",
    },
    {
      image: "https://i.pinimg.com/736x/42/19/f9/4219f9548b8b61162e34dd99638ae04c.jpg",
      price: "$150,000",
      beds: 2,
      baths: 1,
      sqft: 1200,
      location: "Houston, TX",
    },
    {
      image: "https://i.pinimg.com/236x/c6/43/82/c643826265a25958e520e17937328a5b.jpg",
      price: "$450,000",
      beds: 5,
      baths: 4,
      sqft: 3000,
      location: "Chicago, IL",
    },
    {
      image: "https://i.pinimg.com/236x/1e/97/3b/1e973bde8c7ddd94cc1b7e4e3ce3135a.jpg",
      price: "$600,000",
      beds: 6,
      baths: 5,
      sqft: 4000,
      location: "Miami, FL",
    },
    {
      image: "https://i.pinimg.com/474x/49/c8/93/49c8930905de59661305414c9810c5de.jpg",
      price: "$700,000",
      beds: 5,
      baths: 4,
      sqft: 3500,
      location: "San Francisco, CA",
    },
  ]

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      budget: "",
      financing: "",
      additionalInfo: "",
    },
  })

  function onSubmit(values) {
    // In a real app, you would send this data to your backend
    console.log(values)
    console.log("Inquiry for property:", selectedHouse)

    toast.success("Inquiry submitted!", {
      description: `We've received your inquiry for the property in ${selectedHouse?.location}. A real estate agent will contact you shortly.`,
    })
    setOpen(false)
    form.reset()
  }

  const handleInquireClick = (house) => {
    setSelectedHouse(house)
    setOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-2">
      <h1 className="mt-16 text-3xl font-bold">Premium Properties For Sale</h1>
      <div className="mt-6 grid gap-8 md:grid-cols-3">
        {houses.map((item, index) => (
          <div key={index} className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md">
            <div className="relative">
              <img
                src={item.image || "/placeholder.svg"}
                alt="House"
                className="w-full h-60 object-cover rounded-md bg-gray-200"
              />
              <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                For Sale
              </div>
            </div>
            <div className="mt-4 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">Luxury Home</h2>
                <p className="text-muted-foreground text-sm">{item.location}</p>
              </div>
              <p className="text-primary font-bold">{item.price}</p>
            </div>
            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>{item.beds} beds</span>
                <span>{item.baths} bath</span>
                <span>{item.sqft} sqft</span>
              </div>
            </div>
            <Button className="mt-4 w-full" onClick={() => handleInquireClick(item)}>
              Schedule Viewing
            </Button>
          </div>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Inquire About {selectedHouse?.location || "Property"}</DialogTitle>
            <DialogDescription>
              Fill out the form below to schedule a viewing or request more information.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="(123) 456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="preferredDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Preferred Viewing Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? new Date(field.value).toLocaleDateString() : <span>Select a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <div className="p-4 space-y-2">
                          <div className="grid grid-cols-7 gap-2">
                            {[...Array(31)].map((_, i) => {
                              const day = i + 1
                              const date = new Date()
                              date.setDate(day)
                              return (
                                <Button
                                  key={day}
                                  variant="outline"
                                  size="sm"
                                  className={cn(
                                    "h-9 w-9",
                                    field.value && new Date(field.value).getDate() === day
                                      ? "bg-primary text-primary-foreground"
                                      : "",
                                  )}
                                  onClick={() => {
                                    const newDate = new Date()
                                    newDate.setDate(day)
                                    field.onChange(newDate)
                                  }}
                                >
                                  {day}
                                </Button>
                              )
                            })}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Budget</FormLabel>
                    <FormControl>
                      <Input placeholder="$300,000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="financing"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Financing Option</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="mortgage" />
                          </FormControl>
                          <FormLabel className="font-normal">Mortgage</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="cash" />
                          </FormControl>
                          <FormLabel className="font-normal">Cash Purchase</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="undecided" />
                          </FormControl>
                          <FormLabel className="font-normal">Not Sure Yet</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any specific requirements or questions about the property..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Optional: Let us know if you have any specific questions or requirements.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">Submit Inquiry</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BuyHouse

