import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react"

import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/ui/tabs"
import Link from "next/link"

import { getProducts } from "~/server/actions/products"

export default async function Products() {
  const products = await getProducts()
  const activeProducts = products.filter((product) => product.status === "ACTIVE")
  const inactiveProducts = products.filter((product) => product.status === "INACTIVE")

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
                {/* <TabsTrigger value="archived" className="hidden sm:flex">
                  Archived
                </TabsTrigger> */}
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Inactive</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu> */}
                {/* <Button size="sm" variant="outline" className="h-8 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button> */}
                <Link href="/dashboard/products/new">
                    <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Product
                    </span>
                    </Button>
                </Link>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {
                    products.length > 0 ? (
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Description</TableHeader>
                            <TableHeader>Price</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader>Action</TableHeader>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {products.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell>{product.name}</TableCell>
                              <TableCell>{product.description}</TableCell>
                              <TableCell>{product.price}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    product.status === "ACTIVE"
                                      ? "secondary"
                                      : "destructive"
                                  }
                                >
                                  {product.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-8 gap-1"
                                    >
                                      <MoreHorizontal className="h-3.5 w-3.5" />
                                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        More
                                      </span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="flex items-center justify-center h-40">
                        <p className="text-sm text-muted-foreground">
                          No products found
                        </p>
                      </div>
                    )
                  }
                </CardContent>
                <CardFooter>
                  {/* <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div> */}
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="active">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {
                    activeProducts.length > 0 ? (
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Description</TableHeader>
                            <TableHeader>Price</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader>Action</TableHeader>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {activeProducts.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell>{product.name}</TableCell>
                              <TableCell>{product.description}</TableCell>
                              <TableCell>{product.price}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    product.status === "ACTIVE"
                                      ? "secondary"
                                      : "destructive"
                                  }
                                >
                                  {product.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-8 gap-1"
                                    >
                                      <MoreHorizontal className="h-3.5 w-3.5" />
                                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        More
                                      </span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="flex items-center justify-center h-40">
                        <p className="text-sm text-muted-foreground">
                          No products found
                        </p>
                      </div>
                    )
                  }
                </CardContent>
                <CardFooter>
                  {/* <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div> */}
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="inactive">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {
                    inactiveProducts.length > 0 ? (
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Description</TableHeader>
                            <TableHeader>Price</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader>Action</TableHeader>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {inactiveProducts.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell>{product.name}</TableCell>
                              <TableCell>{product.description}</TableCell>
                              <TableCell>{product.price}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    product.status === "ACTIVE"
                                      ? "secondary"
                                      : "destructive"
                                  }
                                >
                                  {product.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-8 gap-1"
                                    >
                                      <MoreHorizontal className="h-3.5 w-3.5" />
                                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        More
                                      </span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="flex items-center justify-center h-40">
                        <p className="text-sm text-muted-foreground">
                          No products found
                        </p>
                      </div>
                    )
                  }
                </CardContent>
                <CardFooter>
                  {/* <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div> */}
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
  )
}
