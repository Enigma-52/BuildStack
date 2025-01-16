import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'
import { generateNewsletterContent } from '../templates/newsletter.js'

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