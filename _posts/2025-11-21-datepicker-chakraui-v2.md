---
layout: post
title:  "React DatePicker - Chakra-UI V2"
date:   2025-11-21 13:46:00 +03
tags: [dev]
mastodon_url: ""
---


"Única" forma de formatear la fecha en Input en Chakra V2.


```javascript

  import {
  FormControl,
  FormLabel,
  Input,
  } from "@chakra-ui/react";
  import dayjs from "dayjs";
  import DatePicker from "react-datepicker";
    
    //código existente...
            <FormControl>
              <FormLabel>Hasta</FormLabel>
              <Input
                as={DatePicker}
                dateFormat={"DD/MM/YYYY"}
                value={dayjs(endDate).format("DD/MM/YYYY")}
                onChange={(e) => {
                  setEndDate(e);
                }}
                maxDate={dayjs(new Date())}
              />
            </FormControl>

  // Código existente...

```