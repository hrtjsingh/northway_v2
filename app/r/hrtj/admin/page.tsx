"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Save, Plus, Trash2, Lock, LogOut } from "lucide-react"
import { siteConfig, type SiteConfig } from "@/lib/site-config"
import { Header } from "@/components/header"
import Logo from "@/components/Logo"

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        localStorage.setItem("adminAuth", "true")
        onLogin()
      } else {
        setError("Invalid username or password")
      }
    } catch (error) {
      setError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the admin panel</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [config, setConfig] = useState<SiteConfig>(siteConfig)
  const [saving, setSaving] = useState(false)
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loadingSubmissions, setLoadingSubmissions] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    setIsAuthenticated(false)
  }

  const fetchSubmissions = async () => {
    setLoadingSubmissions(true)
    try {
      const res = await fetch('/api/admin/contact-submissions')
      if (res.ok) {
        const data = await res.json()
        setSubmissions(data.submissions || [])
      }
    } catch (e) {
      // noop
    } finally {
      setLoadingSubmissions(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage("")

    try {
      const response = await fetch("/api/admin/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
      })

      if (response.ok) {
        setMessage("Configuration saved successfully!")
      } else {
        setMessage("Failed to save configuration")
      }
    } catch (error) {
      setMessage("Error saving configuration")
    } finally {
      setSaving(false)
    }
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={() => setIsAuthenticated(true)} />
  }

  const updateConfig = (path: string, value: any) => {
    setConfig((prev) => {
      const newConfig = { ...prev }
      const keys = path.split(".")
      let current: any = newConfig

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = value
      return newConfig
    })
  }

  const addArrayItem = (path: string, item: any) => {
    setConfig((prev) => {
      const newConfig = { ...prev }
      const keys = path.split(".")
      let current: any = newConfig

      for (const key of keys) {
        current = current[key]
      }

      current.push(item)
      return newConfig
    })
  }

  const removeArrayItem = (path: string, index: number) => {
    setConfig((prev) => {
      const newConfig = { ...prev }
      const keys = path.split(".")
      let current: any = newConfig

      for (const key of keys) {
        current = current[key]
      }

      current.splice(index, 1)
      return newConfig
    })
  }

  return (
    <div className="min-h-screen bg-background p-6 relative" >
      <div className="absolute top-2 left-2" onClick={handleLogout}>
        <Logo />
      </div>
      <div className="max-w-6xl mx-auto pt-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Site Configuration</h1>
            <p className="text-muted-foreground">Manage your website settings and content</p>
          </div>
          <div className="flex items-center gap-4">
            {message && <Badge variant={message.includes("successfully") ? "default" : "destructive"}>{message}</Badge>}
            <Button onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            <Button variant="outline" className="dark:hover:bg-primary dark:border-primary" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 dark:bg-[#2b2a2a] dark:text-primary-foreground">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="countries">Countries</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="contact-submissions" onClick={fetchSubmissions}>Queries</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Basic site information and contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Site Name</Label>
                    <Input id="name" value={config.name} onChange={(e) => updateConfig("name", e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="title">Site Title</Label>
                    <Input id="title" value={config.title} onChange={(e) => updateConfig("title", e.target.value)} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={config.description}
                    onChange={(e) => updateConfig("description", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={config.phone} onChange={(e) => updateConfig("phone", e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={config.email} onChange={(e) => updateConfig("email", e.target.value)} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={config.address}
                    onChange={(e) => updateConfig("address", e.target.value)}
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="hours">Business Hours</Label>
                  <Input id="hours" value={config.hours} onChange={(e) => updateConfig("hours", e.target.value)} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
                <CardDescription>Manage admin login credentials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="admin-username">Username</Label>
                    <Input
                      id="admin-username"
                      value={config.admin.username}
                      onChange={(e) => updateConfig("admin.username", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="admin-password">Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      value={config.admin.password}
                      onChange={(e) => updateConfig("admin.password", e.target.value)}
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Note: Changes to admin credentials will take effect after saving and logging out.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Main banner content and statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hero-title">Title</Label>
                    <Input
                      id="hero-title"
                      value={config.hero.title}
                      onChange={(e) => updateConfig("hero.title", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-subtitle">Subtitle</Label>
                    <Input
                      id="hero-subtitle"
                      value={config.hero.subtitle}
                      onChange={(e) => updateConfig("hero.subtitle", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="hero-bg">Background Image</Label>
                  <Input
                    id="hero-bg"
                    value={config.hero.bg}
                    onChange={(e) => updateConfig("hero.bg", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="hero-description">Description</Label>
                  <Textarea
                    id="hero-description"
                    value={config.hero.description}
                    onChange={(e) => updateConfig("hero.description", e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="hero-cta">Call to Action</Label>
                  <Input
                    id="hero-cta"
                    value={config.hero.cta}
                    onChange={(e) => updateConfig("hero.cta", e.target.value)}
                  />
                </div>

                <div>
                  <Label>Statistics</Label>
                  <div className="space-y-4 mt-2">
                    {config.hero.stats.map((stat, index) => (
                      <Card key={index}>
                        <CardContent className="pt-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label>Number</Label>
                              <Input
                                value={stat.number}
                                onChange={(e) => updateConfig(`hero.stats.${index}.number`, e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Title</Label>
                              <Input
                                value={stat.title}
                                onChange={(e) => updateConfig(`hero.stats.${index}.title`, e.target.value)}
                              />
                            </div>
                            <div className="flex items-end">
                              <Button variant="outline" className="dark:hover:text-[red]" size="sm" onClick={() => removeArrayItem("hero.stats", index)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="mt-2">
                            <Label>Description</Label>
                            <Textarea
                              value={stat.description}
                              onChange={(e) => updateConfig(`hero.stats.${index}.description`, e.target.value)}
                              rows={2}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Button
                      variant="outline"
                      className="dark:hover:bg-primary dark:border-primary"
                      onClick={() =>
                        addArrayItem("hero.stats", { number: "04", title: "New Stat", description: "Description here" })
                      }
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Statistic
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Section</CardTitle>
                <CardDescription>About us content and features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="about-title">Title</Label>
                    <Input
                      id="about-title"
                      value={config.about.title}
                      onChange={(e) => updateConfig("about.title", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="about-subtitle">Subtitle</Label>
                    <Input
                      id="about-subtitle"
                      value={config.about.subtitle}
                      onChange={(e) => updateConfig("about.subtitle", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="about-description">Description</Label>
                  <Textarea
                    id="about-description"
                    value={config.about.description}
                    onChange={(e) => updateConfig("about.description", e.target.value)}
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Features</Label>
                  <div className="space-y-2 mt-2">
                    {config.about.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <Textarea
                          value={feature}
                          onChange={(e) => updateConfig(`about.features.${index}`, e.target.value)}
                          rows={2}
                          className="flex-1"
                        />
                        <Button variant="outline" className="dark:hover:text-[red]" size="sm" onClick={() => removeArrayItem("about.features", index)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" className="dark:hover:bg-primary dark:border-primary" onClick={() => addArrayItem("about.features", "New feature description")}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Feature
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Services Section</CardTitle>
                <CardDescription>Service destinations and visa service content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="services-title">Title</Label>
                    <Input
                      id="services-title"
                      value={config.services.title}
                      onChange={(e) => updateConfig("services.title", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="services-subtitle">Subtitle</Label>
                    <Input
                      id="services-subtitle"
                      value={config.services.subtitle}
                      onChange={(e) => updateConfig("services.subtitle", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Destinations</Label>
                  <div className="space-y-4 mt-2">
                    {config.services.destinations.map((dest, index) => (
                      <Card key={index}>
                        <CardContent className="pt-4">
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <Label>Title</Label>
                              <Input
                                value={dest.title}
                                onChange={(e) => updateConfig(`services.destinations.${index}.title`, e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Icon</Label>
                              <Input
                                value={dest.icon}
                                onChange={(e) => updateConfig(`services.destinations.${index}.icon`, e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="mb-4">
                            <Label>Description</Label>
                            <Textarea
                              value={dest.description}
                              onChange={(e) =>
                                updateConfig(`services.destinations.${index}.description`, e.target.value)
                              }
                              rows={3}
                            />
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="dark:hover:bg-primary dark:border-primary"
                            onClick={() => removeArrayItem("services.destinations", index)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove Destination
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() =>
                        addArrayItem("services.destinations", {
                          title: "New Destination",
                          description: "Description here",
                          icon: "GraduationCap",
                        })
                      }
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Destination
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Visa Service Section</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="visa-title">Title</Label>
                      <Input
                        id="visa-title"
                        value={config.visaService.title}
                        onChange={(e) => updateConfig("visaService.title", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="visa-description">Description</Label>
                      <Textarea
                        id="visa-description"
                        value={config.visaService.description}
                        onChange={(e) => updateConfig("visaService.description", e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="visa-cta">Call to Action</Label>
                      <Input
                        id="visa-cta"
                        value={config.visaService.cta}
                        onChange={(e) => updateConfig("visaService.cta", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="countries">
            <Card>
              <CardHeader>
                <CardTitle>Countries Section</CardTitle>
                <CardDescription>Featured countries and destinations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {config.countries.map((country, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label>Country Name</Label>
                            <Input
                              value={country.name}
                              onChange={(e) => updateConfig(`countries.${index}.name`, e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Flag Emoji</Label>
                            <Input
                              value={country.flag}
                              onChange={(e) => updateConfig(`countries.${index}.flag`, e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <Label>Description</Label>
                          <Textarea
                            value={country.description}
                            onChange={(e) => updateConfig(`countries.${index}.description`, e.target.value)}
                            rows={4}
                          />
                        </div>
                        <div className="mb-4">
                          <Label>Image Path</Label>
                          <Input
                            value={country.image}
                            onChange={(e) => updateConfig(`countries.${index}.image`, e.target.value)}
                          />
                        </div>
                        <Button variant="outline" className="dark:hover:bg-primary dark:border-primary" size="sm" onClick={() => removeArrayItem("countries", index)}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove Country
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  <Button
                    variant="outline"
                    className="dark:hover:bg-primary dark:border-primary"
                    onClick={() =>
                      addArrayItem("countries", {
                        name: "New Country",
                        description: "Description here",
                        image: "/placeholder.svg",
                        flag: "🏳️",
                      })
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Country
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials">
            <Card>
              <CardHeader>
                <CardTitle>Testimonials Section</CardTitle>
                <CardDescription>Customer testimonials and reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {config.testimonials.map((testimonial, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label>Name</Label>
                            <Input
                              value={testimonial.name}
                              onChange={(e) => updateConfig(`testimonials.${index}.name`, e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Role</Label>
                            <Input
                              value={testimonial.role}
                              onChange={(e) => updateConfig(`testimonials.${index}.role`, e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <Label>Content</Label>
                          <Textarea
                            value={testimonial.content}
                            onChange={(e) => updateConfig(`testimonials.${index}.content`, e.target.value)}
                            rows={3}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label>Image Path</Label>
                            <Input
                              value={testimonial.image}
                              onChange={(e) => updateConfig(`testimonials.${index}.image`, e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Rating</Label>
                            <Input
                              type="number"
                              min="1"
                              max="5"
                              value={testimonial.rating}
                              onChange={(e) =>
                                updateConfig(`testimonials.${index}.rating`, Number.parseInt(e.target.value))
                              }
                            />
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="dark:hover:bg-primary dark:border-primary" onClick={() => removeArrayItem("testimonials", index)}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove Testimonial
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  <Button
                    variant="outline"
                    className="dark:hover:bg-primary dark:border-primary"
                    onClick={() =>
                      addArrayItem("testimonials", {
                        name: "New Person",
                        role: "Role",
                        content: "Testimonial content",
                        image: "/placeholder.svg",
                        rating: 5,
                      })
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Testimonial
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact-submissions">
            <Card>
              <CardHeader>
                <CardTitle>Queries</CardTitle>
                <CardDescription>Messages submitted via the Contact form</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingSubmissions ? (
                  <p>Loading...</p>
                ) : submissions.length === 0 ? (
                  <p>No submissions yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left border-b">
                          <th className="py-2 pr-4">Name</th>
                          <th className="py-2 pr-4">Email</th>
                          <th className="py-2 pr-4">Phone</th>
                          <th className="py-2 pr-4">Service</th>
                          <th className="py-2 pr-4">Message</th>
                          <th className="py-2 pr-4">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {submissions.map((s, idx) => (
                          <tr key={idx} className="border-b align-top">
                            <td className="py-2 pr-4">{s.name}</td>
                            <td className="py-2 pr-4">{s.email}</td>
                            <td className="py-2 pr-4">{s.phone}</td>
                            <td className="py-2 pr-4">{s.service}</td>
                            <td className="py-2 pr-4 max-w-[360px] whitespace-pre-wrap">{s.message}</td>
                            <td className="py-2 pr-4">{s.createdAt ? new Date(s.createdAt).toLocaleString() : ''}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
