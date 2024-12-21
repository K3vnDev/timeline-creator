import { z } from 'zod'

const TimelineSchema = z.object({
  name: z.string(),
  id: z.string(),
  color: z.string(),
  elements: z.array(
    z.union([
      z.object({
        type: z.literal('point'),
        id: z.string(),
        content: z.object({
          title: z.string(),
          image: z.string(),
          desc: z.string()
        })
      }),
      z.object({
        type: z.literal('mark'),
        id: z.string(),
        content: z.object({
          text: z.string()
        })
      })
    ])
  )
})

export const parseTimelines = async (data: string) => {
  try {
    const dataObj: z.infer<typeof TimelineSchema>[] = JSON.parse(data)
    const parsedTimelines = await z.array(TimelineSchema).parseAsync(dataObj)

    return parsedTimelines
  } catch (err) {
    console.log(err)
    return null
  }
}
