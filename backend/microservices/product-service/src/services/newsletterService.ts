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
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>BuildStack Weekly</title>
      </head>
      <body style="margin: 0; padding: 0; min-width: 100%; background-color: #f9fafb;">
        <center style="width: 100%; table-layout: fixed; background-color: #f9fafb; padding-bottom: 40px;">
          <table width="600" cellpadding="0" cellspacing="0" style="margin: 0 auto; max-width: 600px; font-family: Arial, sans-serif; border-spacing: 0; color: #111827;">
            <!-- Email Header -->
            <tr>
              <td style="padding: 24px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="48" style="vertical-align: middle;">
                      <div style="background: #f97316; width: 48px; height: 48px; border-radius: 12px; text-align: center; line-height: 48px; color: white; font-weight: bold; font-size: 24px;">
                        B
                      </div>
                    </td>
                    <td style="padding-left: 16px; vertical-align: middle;">
                      <h3 style="margin: 0; font-size: 20px; color: #111827;">BuildStack Weekly</h3>
                      <p style="margin: 4px 0 0; color: #4b5563;">Edition #${editionNumber} | ${currentDate}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            ${products[0] ? `
            <!-- Featured Product -->
            <tr>
              <td style="padding: 24px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff7ed; border: 1px solid #ffedd5; border-radius: 12px;">
                  <tr>
                    <td style="padding: 24px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="112" style="vertical-align: top;">
                            <img src="${products[0].images[0].url}" alt="${products[0].name}" width="112" height="112" style="border-radius: 12px; object-contain: cover; display: block;">
                          </td>
                          <td style="padding-left: 24px; vertical-align: top;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td>
                                  <h4 style="margin: 0 0 8px; font-size: 20px; color: #111827;">${products[0].name}</h4>
                                  <p style="margin: 0 0 12px; color: #4b5563;">${products[0].tagline}</p>
                                </td>
                                <td style="text-align: right;">
                                  <span style="display: inline-block; background-color: white; padding: 8px 16px; border-radius: 9999px; color: #ea580c; font-weight: 500;">Featured Product</span>
                                </td>
                              </tr>
                              <tr>
                                <td colspan="2" style="padding-top: 12px;">
                                  <a href="${products[0].websiteUrl}" style="color: #ea580c; text-decoration: none; font-weight: 500;">Visit Product →</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            ` : ''}

            <!-- Other Products Grid -->
            <tr>
              <td style="padding: 0 24px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${chunks(products.slice(1, 7), 2).map(chunk => `
                    <tr>
                      ${chunk.map(product => `
                        <td width="50%" style="padding: 12px;">
                          <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 12px;">
                            <tr>
                              <td style="padding: 24px;">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td width="80" style="vertical-align: top;">
                                      <img src="${product.images[0].url}" alt="${product.name}" width="80" height="80" style="border-radius: 12px; object-contain: cover; display: block;">
                                    </td>
                                    <td style="padding-left: 16px; vertical-align: top;">
                                      <table width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                          <td>
                                            <h4 style="margin: 0; color: #111827; font-weight: 600;">${product.name}</h4>
                                            <span style="display: inline-block; background-color: #f3f4f6; padding: 4px 8px; border-radius: 9999px; font-size: 12px; color: #4b5563; margin-top: 4px;">
                                              ${product.category}
                                            </span>
                                            <p style="margin: 8px 0; font-size: 14px; color: #4b5563;">${product.tagline}</p>
                                            <a href="${product.websiteUrl}" style="color: #ea580c; text-decoration: none; font-size: 14px;">Learn more →</a>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      `).join('')}
                    </tr>
                  `).join('')}
                </table>
              </td>
            </tr>

            <!-- Email Footer -->
            <tr>
              <td style="padding: 24px; background-color: #f9fafb; text-align: center;">
                <p style="margin: 0; color: #6b7280; font-size: 14px;">You're receiving this because you're subscribed to our weekly product digest.</p>
                <p style="margin: 8px 0 0; color: #6b7280; font-size: 14px;">
                  <a href="[unsubscribe_url]" style="color: #6b7280; text-decoration: underline;">Unsubscribe</a>
                </p>
              </td>
            </tr>
          </table>
        </center>
      </body>
      </html>
    `
}

// Helper function to chunk array into groups of n
function chunks<T>(arr: T[], n: number): T[][] {
    return Array.from(
        { length: Math.ceil(arr.length / n) },
        (_, i) => arr.slice(i * n, (i + 1) * n)
    )
}