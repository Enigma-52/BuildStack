import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'

const prisma = new PrismaClient()

interface NewsletterSubscribe {
  email: string
}

export const subscribe = async ({ email }: NewsletterSubscribe) => {
  try {
    const subscriber = await prisma.newsletter.create({
      data: { email }
    })

    return subscriber
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env['EMAIL_USER'],
      pass: process.env['EMAIL_PASS'],
    }
  })

  export const sendWeeklyNewsletter = async () => {
    try {
      // Get all subscribers
      const subscribers = await prisma.newsletter.findMany()
      const allEmails = subscribers.map(sub => sub.email)
  
      // Fetch top 10 products (implement your logic here)
      const topProducts = await getTopProducts()
  
      // Create email content
      const emailContent = generateNewsletterContent(topProducts)
  
      // Send to all subscribers
      await transporter.sendMail({
        from: process.env['EMAIL_USER'],
        bcc: allEmails, 
        subject: 'Weekly Top Products 🚀 from BuildStack',
        html: emailContent
      })
  
      return { message: 'Weekly newsletter sent successfully', recipientCount: allEmails.length }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
  
  async function getTopProducts() {
    return await prisma.product.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        images: true,
        pricing: true,
        makers: {
          include: {
            user: true
          }
        }
      }
    })
  }
  
  function generateNewsletterContent(products: any[]): string {
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      })
    }
  
    const currentDate = formatDate(new Date())
    const editionNumber = Math.floor((new Date().getTime() - new Date('2024-01-01').getTime()) / (7 * 24 * 60 * 60 * 1000))
  
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Buildstack Weekly</title>
        <style>
          /* Add your email CSS here */
        </style>
      </head>
      <body>
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <!-- Email Header -->
          <div style="background: #f9fafb; padding: 24px; border-bottom: 1px solid #e5e7eb;">
            <div style="display: flex; align-items: center; gap: 16px;">
              <div style="background: linear-gradient(to right, #f97316, #ea580c); width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 24px;">
                P
              </div>
              <div>
                <h3 style="margin: 0; font-size: 20px; color: #111827;">ProductHunt Weekly</h3>
                <p style="margin: 4px 0 0; color: #4b5563;">Edition #${editionNumber} | ${currentDate}</p>
              </div>
            </div>
          </div>
  
          <!-- Featured Product -->
          ${products[0] ? `
          <div style="background: #fff7ed; border: 1px solid #ffedd5; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <div style="display: flex; gap: 24px;">
              <img src="${products[0].images[0]?.url || ''}" alt="${products[0].name}" style="width: 112px; height: 112px; border-radius: 12px; object-fit: cover;">
              <div>
                <div style="display: flex; justify-content: space-between;">
                  <div>
                    <h4 style="margin: 0 0 8px; font-size: 20px; color: #111827;">${products[0].name}</h4>
                    <p style="margin: 0 0 12px; color: #4b5563;">${products[0].tagline}</p>
                  </div>
                  <span style="background: white; padding: 8px 16px; border-radius: 9999px; color: #ea580c; font-weight: 500;">#1 Product of the Week</span>
                </div>
                <div style="display: flex; gap: 16px;">
                  <a href="${products[0].websiteUrl}" style="color: #ea580c; text-decoration: none; font-weight: 500;">Visit Product →</a>
                </div>
              </div>
            </div>
          </div>
          ` : ''}
  
          <!-- Other Products Grid -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 24px 0;">
            ${products.slice(1, 7).map(product => `
              <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px;">
                <div style="display: flex; gap: 16px;">
                  <img src="${product.images[0]?.url || ''}" alt="${product.name}" style="width: 80px; height: 80px; border-radius: 12px; object-fit: cover;">
                  <div>
                    <div style="display: flex; gap: 8px; margin-bottom: 8px;">
                      <h4 style="margin: 0; color: #111827; font-weight: 600;">${product.name}</h4>
                      <span style="background: #f3f4f6; padding: 4px 8px; border-radius: 9999px; font-size: 12px; color: #4b5563;">
                        ${product.category}
                      </span>
                    </div>
                    <p style="margin: 0 0 8px; font-size: 14px; color: #4b5563;">${product.tagline}</p>
                    <a href="${product.websiteUrl}" style="color: #ea580c; text-decoration: none; font-size: 14px;">Learn more →</a>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
  
          <!-- Email Footer -->
          <div style="background: #f9fafb; padding: 24px; text-align: center; color: #6b7280; font-size: 14px;">
            <p style="margin: 0;">You're receiving this because you're subscribed to our weekly product digest.</p>
            <p style="margin: 8px 0 0;">
              <a href="[unsubscribe_url]" style="color: #6b7280; text-decoration: underline;">Unsubscribe</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  }