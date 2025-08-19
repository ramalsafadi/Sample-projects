import React from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel.jsx'
import { Heart, Star, Check, X } from 'lucide-react'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section 1: Implant Offerings */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="flex -space-x-2">
                <div className="w-12 h-12 rounded-full bg-gray-300 border-2 border-white"></div>
                <div className="w-12 h-12 rounded-full bg-gray-300 border-2 border-white"></div>
                <div className="w-12 h-12 rounded-full bg-gray-300 border-2 border-white"></div>
                <div className="w-12 h-12 rounded-full bg-gray-300 border-2 border-white"></div>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '36px' }}>
              Explore Our Implant Offerings
            </h1>
            <Button className="text-white px-6 py-2 rounded-md" style={{ backgroundColor: '#4285F4' }}>
              Free consultation
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Card 1: 4 Implant Retained Overdenture */}
            <Card className="border border-gray-200 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-full h-32 bg-pink-100 rounded-lg mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-pink-300 rounded-full"></div>
                </div>
                <CardTitle className="text-lg font-bold text-gray-900">
                  4 Implant Retained Overdenture
                </CardTitle>
                <div className="text-2xl font-bold" style={{ color: '#4285F4' }}>
                  $9,995 <span className="text-sm text-gray-600">or $209/mo</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Complete Oral Evaluation
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Cone-Beam CT Scan
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  4 Implants per Arch
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Removable Provisional & Final Fixed Prosthesis
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Working with a team of experienced experts who can deliver a life-changing smile
                </div>
                <Button className="w-full text-white mt-4" style={{ backgroundColor: '#4285F4' }}>
                  Free consultation
                </Button>
              </CardContent>
            </Card>

            {/* Card 2: Permanent Teeth Single Arch */}
            <Card className="border border-gray-200 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-full h-32 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-300 rounded-full"></div>
                </div>
                <CardTitle className="text-lg font-bold text-gray-900">
                  Permanent Teeth Single Arch
                </CardTitle>
                <div className="text-2xl font-bold" style={{ color: '#4285F4' }}>
                  $12,995 <span className="text-sm text-gray-600">or $210/mo</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Complete Oral Evaluation
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Cone-Beam CT Scan
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  All-Extractions If Needed
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  4 Implants per Arch
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Fixed Provisional Prosthesis
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Working with a team of experienced experts who can deliver a life-changing smile
                </div>
                <Button className="w-full text-white mt-4" style={{ backgroundColor: '#4285F4' }}>
                  Free consultation
                </Button>
              </CardContent>
            </Card>

            {/* Card 3: All On 4 Zirconia Single Arch */}
            <Card className="border border-gray-200 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-full h-32 bg-red-100 rounded-lg mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-300 rounded-full"></div>
                </div>
                <CardTitle className="text-lg font-bold text-gray-900">
                  All On 4 Zirconia Single Arch (all in)
                </CardTitle>
                <div className="text-2xl font-bold" style={{ color: '#4285F4' }}>
                  $18,995 <span className="text-sm text-gray-600">/ Financing Available</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Complete Oral Evaluation
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Cone-Beam CT Scan
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  4 Implants per Arch
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Fixed Provisional & Final Zirconia Prosthesis
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Working with a team of experienced experts who can deliver a life-changing smile
                </div>
                <Button className="w-full text-white mt-4" style={{ backgroundColor: '#4285F4' }}>
                  Free consultation
                </Button>
              </CardContent>
            </Card>

            {/* Card 4: All On 4 Zirconia Double Arch */}
            <Card className="border border-gray-200 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-full h-32 bg-purple-100 rounded-lg mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-purple-300 rounded-full"></div>
                </div>
                <CardTitle className="text-lg font-bold text-gray-900">
                  All On 4 Zirconia Double Arch (all in)
                </CardTitle>
                <div className="text-2xl font-bold" style={{ color: '#4285F4' }}>
                  $36,995 <span className="text-sm text-gray-600">/ Financing Available</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Complete Oral Evaluation
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Cone-Beam CT Scan
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  4 Implants per Arch
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Fixed Provisional & Final Zirconia Prosthesis
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Working with a team of experienced experts who can deliver a life-changing smile
                </div>
                <Button className="w-full text-white mt-4" style={{ backgroundColor: '#4285F4' }}>
                  Free consultation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 2: Patient Testimonials with Carousel */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <h2 className="text-4xl font-bold text-gray-900 mr-2" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '36px' }}>
                Smiles Transformed
              </h2>
              <Heart className="w-8 h-8 text-red-500 fill-current" />
            </div>
            <p className="text-xl text-gray-600 mb-6" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', fontStyle: 'italic' }}>
              Real Stories From Our Happy Patients
            </p>
            
            {/* Google Badge */}
            <div className="flex items-center justify-center mb-8">
              <div className="inline-flex items-center bg-white border border-gray-300 rounded-full px-5 py-3 shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" className="mr-3">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-gray-800 font-medium" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}>
                  Reviewed on Google
                </span>
                <div className="flex items-center ml-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-current" style={{ color: '#FFB400' }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Carousel */}
          <div className="max-w-4xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {/* Testimonial 1: Sarah H. */}
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <Card className="border border-gray-200 shadow-lg h-full">
                    <CardHeader className="text-center pb-4">
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
                        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-center mb-2">
                        <span className="font-bold text-gray-900 mr-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Sarah H.</span>
                        <Badge className="bg-green-100 text-green-800">5.0</Badge>
                      </div>
                      <div className="flex items-center justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-current" style={{ color: '#FFB400' }} />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-center italic" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        "I Recently Moved And Needed A New Dentist. Stockton Implant Impressed Me With Their Modern Technology And Professional Care. My Dental Health Has Never Been Better!"
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 2: James P. */}
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <Card className="border border-gray-200 shadow-lg h-full">
                    <CardHeader className="text-center pb-4">
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
                        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-center mb-2">
                        <span className="font-bold text-gray-900 mr-2" style={{ fontFamily: 'Roboto, sans-serif' }}>James P.</span>
                        <Badge className="bg-green-100 text-green-800">4.8</Badge>
                      </div>
                      <div className="flex items-center justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-current" style={{ color: '#FFB400' }} />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-center italic" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        "After Years Of Avoiding The Dentist, Stockton Implant Made Me Feel Comfortable. Friendly Staff And Professional Care. Highly Recommended!"
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Testimonial 3: Maria L. */}
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <Card className="border border-gray-200 shadow-lg h-full">
                    <CardHeader className="text-center pb-4">
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
                        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-center mb-2">
                        <span className="font-bold text-gray-900 mr-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Maria L.</span>
                        <Badge className="bg-green-100 text-green-800">4.9</Badge>
                      </div>
                      <div className="flex items-center justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-current" style={{ color: '#FFB400' }} />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-center italic" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        "Finding A Dentist For My Daughter Was Easy With Stockton Implant. The Pediatric Dentist Was Patient And Kind, Making Her Feel Comfortable. She Now Enjoys Her Check-Ups!"
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Section 3: Comparison Table */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '36px' }}>
              Why Wait Up To 10 Months Or More For Your Permanent Teeth?
            </h2>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Header Row */}
              <div className="bg-gray-100 p-6 border-b border-gray-200 hidden md:block"></div>
              <div className="p-6 border-b border-gray-200 text-center" style={{ backgroundColor: '#4285F4' }}>
                <div className="text-white font-bold text-lg" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Stockton Implant By Plume Dental
                </div>
              </div>
              <div className="bg-gray-100 p-6 border-b border-gray-200 text-center">
                <div className="text-gray-900 font-bold text-lg" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Other Traditional Dental Implants
                </div>
              </div>

              {/* Row 1: Permanent Teeth Delivered */}
              <div className="p-6 border-b border-gray-200 font-semibold text-gray-900" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Permanent Teeth Delivered In 24hrs
              </div>
              <div className="p-6 border-b border-gray-200 text-center bg-green-50">
                <Check className="w-8 h-8 text-green-500 mx-auto" />
              </div>
              <div className="p-6 border-b border-gray-200 text-center bg-red-50">
                <div className="flex flex-col items-center justify-center">
                  <X className="w-8 h-8 text-red-500 mb-2" />
                  <span className="text-sm text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>Up To 10+ Months Wait For Permanent Teeth</span>
                </div>
              </div>

              {/* Row 2: Eat Soft Foods */}
              <div className="p-6 border-b border-gray-200 font-semibold text-gray-900" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Eat Soft Foods Immediately
              </div>
              <div className="p-6 border-b border-gray-200 text-center bg-green-50">
                <Check className="w-8 h-8 text-green-500 mx-auto" />
              </div>
              <div className="p-6 border-b border-gray-200 text-center bg-red-50">
                <div className="flex flex-col items-center justify-center">
                  <X className="w-8 h-8 text-red-500 mb-2" />
                  <span className="text-sm text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>May Be On Liquid Diet For Up To 5 Weeks, Then Soft Foods For Up To 8+ Months</span>
                </div>
              </div>

              {/* Row 3: Zirconia Material */}
              <div className="p-6 border-b border-gray-200 font-semibold text-gray-900" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Zirconia Material
              </div>
              <div className="p-6 border-b border-gray-200 text-center bg-green-50">
                <div className="flex flex-col items-center justify-center">
                  <Check className="w-8 h-8 text-green-500 mb-2" />
                  <span className="text-sm text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>Delivered In 24hrs</span>
                </div>
              </div>
              <div className="p-6 border-b border-gray-200 text-center bg-red-50">
                <div className="flex flex-col items-center justify-center">
                  <X className="w-8 h-8 text-red-500 mb-2" />
                  <span className="text-sm text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>Varies, Treatment Up To 10+ Months After Surgery</span>
                </div>
              </div>

              {/* Row 4: Appointments */}
              <div className="p-6 font-semibold text-gray-900" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Only 1 Appointment To Get Permanent Teeth
              </div>
              <div className="p-6 text-center bg-green-50">
                <Check className="w-8 h-8 text-green-500 mx-auto" />
              </div>
              <div className="p-6 text-center bg-red-50">
                <div className="flex flex-col items-center justify-center">
                  <X className="w-8 h-8 text-red-500 mb-2" />
                  <span className="text-sm text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>Up To 9+ Visits Required</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App

