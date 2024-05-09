package com.xiaoqingxin.homeam.beans;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

/**
 * 对spring的Page进一步封装，提供给页面分页数据
 * @author Wu Liangxing
 * @param <T>
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Paged<T> {
    private Page<T> page;

    private Paging paging;
}
